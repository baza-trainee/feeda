from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.urls import reverse
from .utils import *
from .serializer import *


class RequestPasswordResetEmail(generics.GenericAPIView):
    """Відправка email на пошту з посиланням на скидання паролю"""
    serializer_class = ResetPasswordRequestEmailSerializer

    def post(self, request):
        # serializer = self.serializer_class(data=request.data)
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

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset'}, status=status.HTTP_201_CREATED)
