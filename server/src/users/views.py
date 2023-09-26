from coreapi.compat import force_text
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.encoding import (DjangoUnicodeDecodeError, force_bytes,
                                   force_str, smart_bytes, smart_str)
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import *

from src.users.documentation.schemas_settings import (password_reset_doc,
                                                      token_delete_doc,
                                                      token_doc, check_token_doc, password_reset_complete_doc)

from .serializer import *

User = get_user_model()


class CustomAuthToken(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    """Генерація токена доступа"""

    @swagger_auto_schema(**token_doc)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class CustomTokenDestroy(APIView):

    @swagger_auto_schema(**token_delete_doc)
    def delete(self, request):
        try:
            token = Token.objects.get(user=request.user)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordReset(generics.CreateAPIView):
    serializer_class = EmailSerializer

    @swagger_auto_schema(**password_reset_doc)
    def post(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(
            {"status": status.HTTP_200_OK, "message": "Password reset email sent. Please check your email."}
        )


class PasswordTokenCheckAPI(APIView):
    """Перевірка валідності токена"""

    @swagger_auto_schema(**check_token_doc)
    def get(self, request, uidb64, token):
        id = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=id)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({'error': 'invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'uidb64': uidb64}, status=status.HTTP_200_OK)


class NewPassword(generics.GenericAPIView):
    """Збереження нового пароля"""

    queryset = User.objects.all()
    serializer_class = NewPasswordSerializer

    def get_object(self):
        uidb64 = self.request.data.pop("uidb64", None)
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
        except UnicodeDecodeError:
            raise ValidationError("User Not Found")
        user = self.queryset.get(pk=uid)
        return user

    @swagger_auto_schema(**password_reset_complete_doc)
    def patch(self, request):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response({"message": "Password has been updated successfully."}, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()


class CheckToken(APIView):
    def get(self, request):
        token = Token.objects.get(user=request.user)
        if token:
            return True
        else:
            return Response(False)
