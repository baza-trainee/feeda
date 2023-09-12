
from rest_framework import serializers
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed
from .models import *
import re


class AuthTokenSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=2)

    class Meta:
        model = Token
        fields = ('email', 'password', 'created')

    def validate(self, attrs):
        email = attrs.get('email')

        if len(email) < 12:
            raise serializers.ValidationError('Email invalid')

        return attrs


class ResetPasswordRequestEmailSerializer(serializers.ModelSerializer):
    """Відправка email на пошту з посиланням на скидання паролю"""

    email = serializers.EmailField(
        min_length=2
    )

    class Meta:
        model = CustomUser
        fields = ('email',)


class NewPasswordSerializer(serializers.ModelSerializer):
    """Збереження нового пароля"""

    password = serializers.CharField(min_length=8, max_length=12, write_only=True)
    confirm_password = serializers.CharField(min_length=8, max_length=12, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'confirm_password', 'token', 'uidb64')

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            confirm_password = attrs.get('confirm_password')
            token = attrs.get('token')
            uidn64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidn64))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Invalid token')

            if password != confirm_password:
                raise AuthenticationFailed('Passwords do not match')

            if not re.search(r'[A-Z]', password):
                raise serializers.ValidationError('The password must contain at least one capital letter')
            if not re.search(r'[a-z]', password):
                raise serializers.ValidationError('The password must contain at least one lowercase letter')
            if not re.search(r'\d', password):
                raise serializers.ValidationError('The password must contain at least one digit')

            user.set_password(password)
            user.save()
            return user
        except Exception as error:
            raise AuthenticationFailed('Invalid token')
