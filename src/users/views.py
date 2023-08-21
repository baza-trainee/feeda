from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import generics, permissions, status
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.urls import reverse
from django.conf import settings
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from .utils import *
from .serializer import *
import datetime
import jwt
from rest_framework_simplejwt.views import *


class CustomAuthToken(ObtainAuthToken):
    """Генерація токена доступа"""

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.FORMAT_EMAIL),
                'password': openapi.Schema(type=openapi.FORMAT_PASSWORD)
            },
            required=['email', 'password'],
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Response(
                description='Token generated successfully',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'token': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Response(
                description='Invalid data provided',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
        },
    )
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        # token, created = Token.objects.get_or_create(user=user)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        token, created = Token.objects.get_or_create(user=user)
        # token.life_tome_token = timezone.now() + datetime.timedelta(minutes=1)

        return Response({'token': token.key})


class CustomTokenDestroy(generics.DestroyAPIView):
    queryset = Token.objects.all()

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'Authorization',
                openapi.IN_HEADER,
                description='Token',
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Token removed',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Response(
                description='Invalid token',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
        },
    )
    def delete(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=self.request.user)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        token.delete()
        return Response({'message': 'Delete'}, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    """Відправка email на пошту з посиланням на скидання паролю"""
    serializer_class = ResetPasswordRequestEmailSerializer

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Success',
                schema=ResetPasswordRequestEmailSerializer()
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        }
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data['email']

        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = reverse('reset-password-confirm', kwargs={'uidb64': uidb64, 'token': token})
            absolut_url = 'http://' + current_site + relative_link
            email_body = f'Hello, Use link below to reset your password {absolut_url}'
            data = {
                'email_body': email_body,
                'to_email': user.email,
                'absolut_url': absolut_url,
                'email_subject': 'Reset your password'
            }
            Util.send_mail(data)
        return Response({'message:' 'Ми надіслали лист для заміни пароля'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(APIView):
    """Перевірка валідності токена"""
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token not found'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response(
                {'success': True, 'message': 'OK', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK
            )
        except DjangoUnicodeDecodeError as error:
            print('error:', error)


class NewPassword(generics.GenericAPIView):
    """Збереження нового пароля"""

    serializer_class = NewPasswordSerializer

    @swagger_auto_schema(
        responses={
            status.HTTP_400_BAD_REQUEST: openapi.Response(
                description='Invalid data',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            )
        }
    )
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset'}, status=status.HTTP_201_CREATED)
