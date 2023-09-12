from django.db import transaction
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from dashboard.models import Participant, Project, ProjectParticipants, Role
from feeda.decorators import viewset_swagger_decorator
from participants.documentation.schemas_settings import participants_doc
from participants.filters import ParticipantFilter
from participants.serializers import (
    ParticipantSerializer,
    RetrieveParticipantSerializer,
)
from projects.serializers import (
    ProjectParticipantsSerializer,
    ProjectSerializer,
    RetrieveProjectSerializer,
)


@viewset_swagger_decorator(
    ["list", "retrieve", "create", "update", "partial_update", "destroy"], "Participant", participants_doc, )
class ParticipantViewSet(ModelViewSet):
    """
    GET - Return List Of all Participants
    GET/<pk>/ - Return Participant
    POST - Create Participant
    PUT/<pk>/ - Update Participant
    PATCH/<pk>/- Partial update of Participant
    DELETE/<pk>/ - Delete Participant by uuid
    """

    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = (IsAdminUser,)

    filterset_class = ParticipantFilter

    def retrieve(self, request, *args, **kwargs):
        # повернення інфи про юзера та проекти
        with transaction.atomic():
            response = super().retrieve(request, *args, **kwargs)
            projects = ProjectParticipants.objects.filter(user=self.get_object())
            project_serializer = RetrieveParticipantSerializer(projects, many=True).data if projects else []
            response.data["projects"] = project_serializer
        return Response(response.data)

    def create(self, request, *args, **kwargs):
        # створення юзера
        projects = request.data.pop("projects", [])  # projects = [ { "project": 1 } ]

        try:
            with transaction.atomic():
                response = super().create(request, *args, **kwargs)
                if projects:
                    # створюємо проекти з юзером
                    for project in projects:
                        project["user"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=project)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()
                else:
                    raise ValidationError("Створення без проектів не можливе")

                # вертаємо список проектів
                projects = ProjectParticipants.objects.filter(user=response.data["id"])
                project_serializer = RetrieveParticipantSerializer(projects, many=True).data if projects else []
                response.data["projects"] = project_serializer
        except Exception as error:
            return Response(
                {"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(response.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        projects = request.data.pop("projects", [])  # projects = [ { "project": 1 } ]

        try:
            with transaction.atomic():
                # Оновлюєм об'єкт
                response = super().update(request, *args, **kwargs)
                user = self.get_object()

                if projects:
                    # id проектів в яких є користувач
                    user_projects_ids = list(
                        ProjectParticipants.objects.filter(user=user).values_list(
                            "project", flat=True
                        )
                    )

                    # список проектів які потрібно буде удалити
                    delete_projects_ids = []

                    for project in projects:
                        project_id = project["project"]

                        # додаємо юзера в проект якщо немає його
                        if project_id not in user_projects_ids:
                            project["user"] = response.data["id"]
                            serializer = ProjectParticipantsSerializer(data=project)
                            serializer.is_valid(raise_exception=True)
                            serializer.save()

                        # додаємо id щоб знати які проекти не видаляти
                        delete_projects_ids.append(project_id)

                    # видаляємо всі проекти яких немає
                    deleted_projects = ProjectParticipants.objects.exclude(
                        project__in=delete_projects_ids
                    )
                    deleted_projects.delete()
                else:
                    raise ValidationError("Видалення всіх проектів неможливе")

                # вертаємо оновлену інфу про проекти
                projects = ProjectParticipants.objects.filter(user=self.get_object())
                project_serializer = RetrieveParticipantSerializer(projects, many=True).data if projects else []
                response.data["projects"] = project_serializer
        except Exception as error:
            return Response(
                {"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(response.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        # видалення юзера разом з проектами в яких він участвує
        user = self.get_object()
        projects = ProjectParticipants.objects.filter(user=user)
        if projects:
            with transaction.atomic():
                self.perform_destroy(user)
                projects.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return super().destroy(request, *args, **kwargs)
