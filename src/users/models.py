import datetime
import secrets
from rest_framework.authtoken.models import Token
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from .manager import CustomUserManager
import uuid
from django.utils import timezone


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
