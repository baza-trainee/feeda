from django.urls import path

from .views import *

urlpatterns = [
    path('login/', CustomAuthToken.as_view()),
    path('logout/', CustomTokenDestroy.as_view()),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password_reset_confirm'),
    path('password-reset/', PasswordReset.as_view(), name='reset-password-email'),
    path('password-reset-complete/', NewPassword.as_view(), name='new-password-complete'),
    path('check/', CheckToken.as_view())
]

