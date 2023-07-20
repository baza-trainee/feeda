from django.urls import path
from .views import *


urlpatterns = [
    path('logout/', LogoutUser.as_view()),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='reset-password-confirm'),
    path('reset-password-email/', RequestPasswordResetEmail.as_view(), name='reset-password-email'),
    path('password-reset-complete/', NewPassword.as_view(), name='new-password-complete')
]

