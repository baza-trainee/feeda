import re

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import (PasswordResetTokenGenerator,
                                        default_token_generator)
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, status
from rest_framework.exceptions import AuthenticationFailed, ValidationError

from src.users.utils import send_password_reset_email

from .models import *

User = get_user_model()


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label=_("Email"),
        write_only=True
    )
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )
    token = serializers.CharField(
        label=_("Token"),
        read_only=True
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        if len(email) < 12:
            raise serializers.ValidationError('Email invalid')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email address does not exist.")
        return value

    def save(self, **kwargs):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        send_password_reset_email(uid, token, email)


class NewPasswordSerializer(serializers.ModelSerializer):
    """Збереження нового пароля"""

    password = serializers.CharField(min_length=8, max_length=12, write_only=True)
    confirm_password = serializers.CharField(min_length=8, max_length=12, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'confirm_password')

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        if password != confirm_password:
            raise ValidationError('Passwords do not match', code=status.HTTP_400_BAD_REQUEST)

        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError('The password must contain at least one capital letter')
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError('The password must contain at least one lowercase letter')
        if not re.search(r'\d', password):
            raise serializers.ValidationError('The password must contain at least one digit')

        return attrs

    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        instance.set_password(password)
        instance.save()
        return instance
