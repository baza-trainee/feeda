from smtplib import SMTPException

from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response


def send_password_reset_email(uid, token, to_email):
    subject = "Password Reset"
    password_reset_link = reverse("password_reset_confirm", kwargs={"uidb64": uid, "token": token})
    password_reset_url = f"http://localhost:3000/{password_reset_link}"
    message = f"Click on this link to reset your password: {password_reset_url}"
    from_email = settings.EMAIL_HOST_USER
    try:
        send_mail(subject, message, from_email, [to_email], fail_silently=True)
    except SMTPException as e:
        return Response({"status": status.HTTP_500_INTERNAL_SERVER_ERROR, "error": e,
                         "message": "An error occurred while sending the email. Please try again later."})
