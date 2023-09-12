from django.db import transaction
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from dashboard.models import Participant, Project, ProjectParticipants, Role
from feeda.decorators import viewset_swagger_decorator
from projects.documentation.schemas_settings import (project_application_doc,
                                                     projects_doc)
from projects.filters import ProjectFilter
from projects.serializers import (ProjectParticipantsSerializer,
                                  ProjectSerializer, RetrieveProjectSerializer,
                                  ReturnParticipantInfoSerializer)


@viewset_swagger_decorator(
    ["list", "retrieve", "create", "update", "partial_update", "destroy"], "Project", projects_doc
)
class ProjectViewSet(ModelViewSet):
    """
   GET - Return List Of all projects
   GET/<slug>/ - Return Project with participants (users and team leads)
   POST - Create project
   PUT/<slug>/ - Update project
   PATCH/<slug>/- Partial update of project
   DELETE/<slug>/ - Delete project by slug
   """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (IsAdminUser,)
    filterset_class = ProjectFilter
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectSerializer
        else:
            return RetrieveProjectSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        users = ProjectParticipants.objects.filter(project=self.get_object(), team_lead=False)
        team_leads = ProjectParticipants.objects.filter(project=self.get_object(), team_lead=True)
        users_data = ProjectParticipantsSerializer(list(users), many=True).data
        team_leads_data = ProjectParticipantsSerializer(list(team_leads), many=True).data
        response.data["participants"] = {"users": users_data, "team_leads": team_leads_data}
        return Response(response.data)

    def create(self, request, *args, **kwargs):
        participants = request.data.pop("participants", [])
        with transaction.atomic():
            response = super().create(request, *args, **kwargs)
            if participants:
                if participants["users"]:
                    for user in participants["users"]:
                        # беремо юзера
                        part = Participant.objects.get(first_name=user["first_name"], last_name=user["last_name"])

                        # передаємо дані шоб додати в проект юзера
                        user["user"] = part.id
                        user["project"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=user)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                        # вертаємо дані про юзера в проекті
                        users_data = {
                            "first_name": user["first_name"],
                            "last_name": user["last_name"],
                            "role": user["role"],
                            "comment": user["comment"]
                        }
                        user_serializer = ReturnParticipantInfoSerializer(data=users_data)
                        user_serializer.is_valid(raise_exception=True)
                if participants["team_leads"]:
                    for team_lead in participants["team_leads"]:
                        # беремо юзера
                        part = Participant.objects.get(first_name=team_lead["first_name"],
                                                       last_name=team_lead["last_name"])

                        # передаємо дані шоб додати в проект юзера
                        team_lead["user"] = part.id
                        team_lead["team_lead"] = True
                        team_lead["project"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=team_lead)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                        # вертаємо дані про юзера в проекті

                        team_leads_data = {
                            "first_name": team_lead["first_name"],
                            "last_name": team_lead["last_name"],
                            "role": team_lead["role"],
                            "team_lead": True,
                            "comment": team_lead["comment"]
                        }
                        team_leads_serializer = ReturnParticipantInfoSerializer(data=team_leads_data)
                        team_leads_serializer.is_valid(raise_exception=True)
                users = user_serializer.data if user_serializer.data else []
                team_leads = team_leads_serializer.data if team_leads_serializer.data else []
                response.data["participants"] = {"users": users, "team_leads": team_leads}
            return Response(response.data)

    def update(self, request, *args, **kwargs):
        participants = request.data.pop("participants", [])
        team_leads = []
        users = []
        with transaction.atomic():
            response = super().update(request, *args, **kwargs)
            if participants:
                if participants["users"]:
                    for user in participants["users"]:
                        # Беремо юзера
                        part = get_object_or_404(Participant, first_name=user["first_name"],
                                                 last_name=user["last_name"])

                        ProjectParticipants.objects.filter(project=response.data["id"], team_lead=False).delete()

                        # апдейт користувача в проекті
                        user["user"] = part.id
                        user["project"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=user)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                        # вертаємо дані про юзера в проекті
                        users_data = {
                            "first_name": user["first_name"],
                            "last_name": user["last_name"],
                            "role": user["role"],
                            "comment": user["comment"]
                        }
                        user_serializer = ReturnParticipantInfoSerializer(data=users_data) if participants[
                            "users"] else []
                        user_serializer.is_valid(raise_exception=True)
                        users = user_serializer.data if user_serializer.data else []
                else:
                    # якщо не передано користувачів удаляємо їх у проектах
                    ProjectParticipants.objects.filter(project=response.data["id"], team_lead=False).delete()
                if participants["team_leads"]:
                    for team_lead in participants["team_leads"]:
                        part = get_object_or_404(Participant, first_name=team_lead["first_name"],
                                                 last_name=team_lead["last_name"])
                        ProjectParticipants.objects.filter(project=response.data["id"], team_lead=True).delete()
                        team_lead["user"] = part.id
                        team_lead["team_lead"] = True
                        team_lead["project"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=team_lead)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                        # вертаємо дані про тімлідів
                        team_leads_data = {
                            "first_name": team_lead["first_name"],
                            "last_name": team_lead["last_name"],
                            "role": team_lead["role"],
                            "team_lead": True,
                            "comment": team_lead["comment"]
                        }
                        team_leads_serializer = ReturnParticipantInfoSerializer(data=team_leads_data)
                        team_leads_serializer.is_valid(raise_exception=True)
                        team_leads = team_leads_serializer.data if team_leads_serializer.data else []
                else:
                    # якщо не передано тімлідів удаляємо їх у проектах
                    ProjectParticipants.objects.filter(project=response.data["id"], team_lead=True).delete()
                response.data["participants"] = {"users": users, "team_leads": team_leads}
            else:
                # якщо не передають юзерів то всіх удаляємо
                self.get_object().participants.all().delete()
                response.data["participants"] = {"users": users, "team_leads": team_leads}
            return Response(response.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        project = get_object_or_404(Project, slug=kwargs["slug"])
        ProjectParticipants.objects.filter(project=project).delete()
        return super().destroy(request, *args, **kwargs)


class ProjectsApplication(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @swagger_auto_schema(**project_application_doc)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
