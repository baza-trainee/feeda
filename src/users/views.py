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
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from .utils import *
from .serializer import *
import datetime
import jwt
from rest_framework_simplejwt.views import *


# class RegisterUser(APIView):
#     def post(self, request):
#         serializer = UserRegisterSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#
# class UserLogin(APIView):
#
#     @swagger_auto_schema(
#         request_body=openapi.Schema(
#             type=openapi.TYPE_OBJECT,
#             properties={
#                 'email': openapi.Schema(type=openapi.FORMAT_EMAIL),
#                 'password': openapi.Schema(type=openapi.FORMAT_PASSWORD)
#             },
#             required=[
#                 'email', 'password'
#             ]
#         ),
#         responses={
#             status.HTTP_200_OK: openapi.Response(description='User login'),
#             status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
#         }
#     )
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']
#         user = CustomUser.objects.filter(email=email).first()
#
#         if user is None:
#             raise AuthenticationFailed('User not found')
#
#         if not user.check_password(password):
#             raise AuthenticationFailed('Incorrect data')
#
#         payload = {
#             'id': str(user.id),
#             'email': user.email,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
#             'iat': datetime.datetime.utcnow(),
#             'is_superuser': user.is_superuser,
#             'is_staff': user.is_staff
#         }
#
#         token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
#
#         return Response({'token': token})
#
#
# class Logout(APIView):
#
#     @swagger_auto_schema(
#         request_body=openapi.Schema(
#             type=openapi.TYPE_OBJECT,
#             properties={
#                 'token': openapi.Schema(type=openapi.TYPE_STRING)
#             },
#             required=[
#                 'token'
#             ]
#         ),
#         responses={
#             status.HTTP_200_OK: openapi.Response(description='User login'),
#             status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
#         }
#     )
#     def post(self, request):
#         token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
#
#         try:
#             payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
#         except jwt.ExpiredSignatureError:
#             return Response({'error': 'Expired JWT'}, status=status.HTTP_401_UNAUTHORIZED)
#
#         return Response({'message': 'Logged out'})


class LogoutUser(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Logout'}, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    """Відправка email на пошту з посиланням на скидання паролю"""
    serializer_class = ResetPasswordRequestEmailSerializer

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: 'Success',
            status.HTTP_400_BAD_REQUEST: 'Bad Request'
        }
    )
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
