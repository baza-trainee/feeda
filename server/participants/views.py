import base64

import pdfkit
from dashboard.models import Participant, Project, ProjectParticipants, Role
from django.conf import settings
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from django.template.loader import get_template
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.db import transaction

from participants.documentation.schemas_settings import \
    participant_application_doc, participant_email_doc
from participants.serializers import ParticipantApplicationSerializer
from rest_framework.views import APIView


class ParticipantAPIView(generics.CreateAPIView):
    """Заповнення анкети"""
    queryset = Participant.objects.all()
    serializer_class = ParticipantApplicationSerializer

    @swagger_auto_schema(**participant_application_doc)
    def post(self, request, *args, **kwargs):
        project_id = request.data.pop("project", None)
        if not project_id:
            raise ValidationError("NOT NULL constraint failed: project", code=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            response = super().post(request, *args, **kwargs)

            # додаємо користувача до проекту
            role = get_object_or_404(Role, title="None")
            ProjectParticipants.objects.create(user_id=response.data["id"], project_id=project_id, role=role)
            return Response(response.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        role = get_object_or_404(Role, title="None")
        serializer.save(role=role)


class GeneratePDF(APIView):
    """Генерація PDF для пошти"""

    @swagger_auto_schema(auto_schema=None)
    def get(self, request):
        with open('static/logo/bt-logo.png', 'rb') as image_file:
            base64_image = base64.b64encode(image_file.read()).decode('utf-8')

        context = {'base64_image': base64_image}
        template = get_template("email_send.html")
        rendered_html = template.render(context=context)
        config = pdfkit.configuration(wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
        try:
            pdfkit.from_string(rendered_html, "email.pdf", configuration=config)
        except OSError as error:
            print(error)
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "error": {
                        "message": "wkhtmltopdf was not found. " 'Check if the path to the wkhtmltopdf.exe is correct."'
                    },
                }
            )
        return Response({"status": status.HTTP_200_OK})


class EmailSend(APIView):
    """ Відправлення листа користувачу"""

    @swagger_auto_schema(**participant_email_doc)
    def get(self, request, id):
        user_email = get_object_or_404(Participant, id=id).email
        from_email = settings.EMAIL_HOST_USER
        to_email = user_email

        subject = 'Welcome Baza Trainee Ukraine'
        email = EmailMessage(subject=subject, from_email=from_email, to=[to_email])

        pdf_path = "/feeda/participants/email/email.pdf"
        email.attach_file(pdf_path)
        try:
            email.send(fail_silently=False)
        except Exception:
            return Response({"message": "Something went wrong while sending email"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Email has been sent successfully"}, status=status.HTTP_200_OK)
