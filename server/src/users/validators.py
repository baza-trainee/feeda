import re

from django.core.exceptions import ValidationError
from rest_framework import validators


class CustomPasswordValidator:
    def validate(self, password, user=None):
        if not re.search(r'[A-Z]', password):
            raise ValidationError('The password must contain at least one capital letter')
        if not re.search(r'[a-z]', password):
            raise ValidationError('The password must contain at least one lowercase letter')
        if not re.search(r'\d', password):
            raise ValidationError('The password must contain at least one digit')
