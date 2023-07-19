from django.contrib.sites.shortcuts import get_current_site
from rest_framework import serializers
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework.exceptions import AuthenticationFailed
from djoser.serializers import UserCreateSerializer
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import *
from .utils import *


# class UserRegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ('email', 'password')
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
#
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#
#         if password is not None:
#             instance.set_password(password)
#
#         instance.save()
#         return instance


class ResetPasswordRequestEmailSerializer(serializers.ModelSerializer):
    """Відправка email на пошту з посиланням на скидання паролю"""

    email = serializers.EmailField(min_length=2)

    class Meta:
        model = CustomUser
        fields = ('email', )


class NewPasswordSerializer(serializers.ModelSerializer):
    """Збереження нового пароля"""

    password = serializers.CharField(min_length=6, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'token', 'uidb64')

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidn64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidn64))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Invalid token')

            user.set_password(password)
            user.save()
            return user
        except Exception as error:
            raise AuthenticationFailed('Invalid token')
