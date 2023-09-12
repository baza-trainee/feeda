from dashboard.models import Participant, Project, ProjectParticipants
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from participants.documentation.schemas_settings import \
    participant_application_doc
from participants.serializers import ParticipantApplicationSerializer


class ParticipantAPIView(generics.CreateAPIView):
    """Заповнення анкети"""
    queryset = Participant.objects.all()
    serializer_class = ParticipantApplicationSerializer

    @swagger_auto_schema(**participant_application_doc)
    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        project_id = request.data.pop("project", None)
        user = Participant.objects.filter(email=email).first()

        # валідація на участь в проекті
        if user and ProjectParticipants.objects.filter(user=user, project_id=project_id).first():
            raise ValidationError('This user is already associated with the project.')

        response = super().post(request, *args, **kwargs)

        # додаємо користувача до проекту
        ProjectParticipants.objects.create(user_id=response.data["id"], project_id=project_id)
        return Response(response.data, status=status.HTTP_201_CREATED)
