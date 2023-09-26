from django.db import transaction
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
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
        users = []
        team_leads = []
        with transaction.atomic():
            response = super().create(request, *args, **kwargs)
            project = Project.objects.get(id=response.data["id"])
            if participants:
                if participants["users"]:
                    for user in participants["users"]:
                        # беремо юзера
                        part = Participant.objects.get(id=user["id"])

                        # передаємо дані шоб додати в проект юзера
                        user["user"] = part.id
                        user["project"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=user)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                    # вертаємо дані про юзера в проекті
                    users = project.participants.filter(team_lead=False)
                    users = ReturnParticipantInfoSerializer(users, many=True).data
                if participants["team_leads"]:
                    for team_lead in participants["team_leads"]:
                        # беремо юзера
                        part = Participant.objects.get(id=team_lead["id"])

                        # передаємо дані шоб додати в проект юзера
                        team_lead["user"] = part.id
                        team_lead["team_lead"] = True
                        team_lead["project"] = response.data["id"]
                        serializer = ProjectParticipantsSerializer(data=team_lead)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                    # вертаємо дані про тімліда в проекті
                    team_leads = project.participants.filter(team_lead=True)
                    team_leads = ReturnParticipantInfoSerializer(team_leads, many=True).data

                response.data["participants"] = {"users": users, "team_leads": team_leads}
            return Response(response.data)

    def update(self, request, *args, **kwargs):
        participants_partial = request.data["participants"] if "participants" in request.data else None
        participants = request.data.pop("participants", [])
        rezerv_project = get_object_or_404(Project, title="Без проєкту")
        project = self.get_object()
        with transaction.atomic():
            response = super().update(request, *args, **kwargs)
            if participants:
                if participants["users"]:

                    # список юзерів яких потрібно буде в Без проєкту
                    delete_users_ids = []
                    for user in participants["users"]:
                        # Беремо юзера
                        try:
                            part = Participant.objects.get(id=user["id"])
                        except Exception:
                            raise ValidationError("Participant matching query does not exist.",
                                                  code=status.HTTP_404_NOT_FOUND)

                        # апдейт/створення користувача в проекті
                        user["user"] = part.id
                        user["project"] = project.id
                        project_participant = ProjectParticipants.objects.filter(
                            project=project, team_lead=False, user=user["user"]
                        )
                        if project_participant:
                            serializer = ProjectParticipantsSerializer(instance=project_participant.first(), data=user)
                        else:
                            serializer = ProjectParticipantsSerializer(data=user)

                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                        delete_users_ids.append(user["id"])

                    # переміщаємо юзерів яких немає в Без проєкту
                    deleted_users = ProjectParticipants.objects.filter(project=project, team_lead=False) \
                        .exclude(user_id__in=delete_users_ids)

                    deleted_user_ids = deleted_users.values_list('user_id', flat=True)
                    deleted_participants = Participant.objects.filter(id__in=deleted_user_ids).annotate(
                        project_count=Count("all_projects"))

                    # провіряємо кількість проектів користувачів
                    for deleted_participant in deleted_participants:
                        if deleted_participant.project_count > 1:
                            project.participants.get(user=deleted_participant, team_lead=False).delete()
                        else:
                            # приділяємо в Без проєкту якщо проектів крім цього немає
                            user = ProjectParticipants.objects.get(user=deleted_participant, team_lead=False)
                            user.project = rezerv_project
                            user.save()

                else:
                    # якщо не передано користувачів удаляємо їх у проектах ставимо в Без проєкту якшо лише цей проект
                    deleted_user_ids = self.get_object().participants.filter(team_lead=False).values_list("user_id")

                    # групуємо кожен об'єкт з кількість його проектів
                    deleted_participants = Participant.objects.filter(id__in=deleted_user_ids).annotate(
                        project_count=Count("all_projects"))

                    # провіряємо кількість проектів користувачів
                    for deleted_participant in deleted_participants:
                        if deleted_participant.project_count > 1:
                            project.participants.get(user=deleted_participant, team_lead=False).delete()
                        else:
                            # приділяємо в Без проєкту якщо проектів крім цього немає
                            user = ProjectParticipants.objects.get(user=deleted_participant, team_lead=False)
                            user.project = rezerv_project
                            user.save()

                if participants["team_leads"]:
                    delete_team_leads_ids = []
                    for team_lead in participants["team_leads"]:
                        try:
                            part = Participant.objects.get(id=team_lead["id"])
                        except Exception:
                            raise ValidationError("Participant matching query does not exist.",
                                                  code=status.HTTP_404_NOT_FOUND)
                        team_lead["user"] = part.id
                        team_lead["team_lead"] = True
                        team_lead["project"] = project.id
                        project_participant = ProjectParticipants.objects.filter(
                            project=project, team_lead=True, user=team_lead["user"]
                        )
                        if project_participant:
                            serializer = ProjectParticipantsSerializer(instance=project_participant.first(),
                                                                       data=team_lead)
                        else:
                            serializer = ProjectParticipantsSerializer(data=team_lead)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()

                        delete_team_leads_ids.append(team_lead["id"])
                    # переміщаємо юзерів яких немає в Без проєкту
                    deleted_team_leads = ProjectParticipants.objects.filter(project=project, team_lead=True) \
                        .exclude(user_id__in=delete_team_leads_ids)

                    deleted_team_leads_ids = deleted_team_leads.values_list('user_id', flat=True)
                    deleted_participants = Participant.objects.filter(id__in=deleted_team_leads_ids).annotate(
                        project_count=Count("all_projects"))

                    # провіряємо кількість проектів користувачів
                    for deleted_participant in deleted_participants:
                        # якшо проектів більше за 1 то удаляємо з цього проекту
                        if deleted_participant.project_count > 1:
                            project.participants.get(user=deleted_participant, team_lead=True).delete()
                        else:
                            # приділяємо в Без проєкту якщо проектів крім цього немає
                            user = ProjectParticipants.objects.get(user=deleted_participant, team_lead=True)
                            user.project = rezerv_project
                            user.save()
                else:
                    # якщо не передано тімлідів удаляємо їх у проектах
                    deleted_team_leads_ids = project.participants.filter(team_lead=True).values_list("user_id")
                    deleted_participants = Participant.objects.filter(id__in=deleted_team_leads_ids).annotate(
                        project_count=Count("all_projects"))

                    # провіряємо кількість проектів користувачів
                    for deleted_participant in deleted_participants:
                        if deleted_participant.project_count > 1:
                            project.participants.get(user=deleted_participant, team_lead=True).delete()
                        else:
                            # приділяємо в Без проєкту якщо проектів крім цього немає
                            user = ProjectParticipants.objects.get(user=deleted_participant, team_lead=True)
                            user.project = rezerv_project
                            user.save()
            else:
                # якщо не передають юзерів то всіх удаляємо
                if not kwargs.get("partial"):
                    deleted_users_ids = project.participants.all().values_list("user_id")
                    deleted_participants = Participant.objects.filter(id__in=deleted_users_ids).annotate(
                        project_count=Count("all_projects"))

                    # провіряємо кількість проектів користувачів
                    for deleted_participant in deleted_participants:
                        if deleted_participant.project_count > 1:
                            has_other_projects = ProjectParticipants.objects.filter(
                                user=deleted_participant
                            ).exclude(project=project).exists()
                            if not has_other_projects:
                                # Якщо користувач не бере участь в інших проектах, то переносимо його в Без проєкту
                                user = ProjectParticipants.objects.filter(user=deleted_participant).first()
                                user.project = rezerv_project
                                user.save()
                            project.participants.filter(user=deleted_participant).delete()
                        else:
                            # приділяємо в Без проєкту якщо проектів крім цього немає
                            user = ProjectParticipants.objects.get(user=deleted_participant)
                            user.project = rezerv_project
                            user.save()
                else:
                    if participants_partial is None:
                        deleted_users_ids = project.participants.all().values_list("user_id")
                        deleted_participants = Participant.objects.filter(id__in=deleted_users_ids).annotate(
                            project_count=Count("all_projects"))

                        # провіряємо кількість проектів користувачів
                        for deleted_participant in deleted_participants:
                            if deleted_participant.project_count > 1:
                                has_other_projects = ProjectParticipants.objects.filter(
                                    user=deleted_participant
                                ).exclude(project=project).exists()
                                if not has_other_projects:
                                    # Якщо користувач не бере участь в інших проектах, то переносимо його в Без проєкту
                                    user = ProjectParticipants.objects.filter(user=deleted_participant).first()
                                    user.project = rezerv_project
                                    user.save()
                                project.participants.filter(user=deleted_participant).delete()
                            else:
                                # приділяємо в Без проєкту якщо проектів крім цього немає
                                user = ProjectParticipants.objects.get(user=deleted_participant)
                                user.project = rezerv_project
                                user.save()

            users = project.participants.filter(team_lead=False)
            users = ReturnParticipantInfoSerializer(users, many=True).data

            team_leads = project.participants.filter(team_lead=True)
            team_leads = ReturnParticipantInfoSerializer(team_leads, many=True).data
            response.data["participants"] = {"users": users, "team_leads": team_leads}
            return Response(response.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        with transaction.atomic():
            project = self.get_object()
            rezerv_project = get_object_or_404(Project, title="Без проєкту")

            deleted_users_ids = project.participants.all().values_list("user_id")
            deleted_participants = Participant.objects.filter(id__in=deleted_users_ids).annotate(
                project_count=Count("all_projects"))

            # провіряємо кількість проектів користувачів
            for deleted_participant in deleted_participants:
                if deleted_participant.project_count > 1:
                    has_other_projects = ProjectParticipants.objects.filter(
                        user=deleted_participant
                    ).exclude(project=project).exists()
                    if not has_other_projects:
                        # Якщо користувач не бере участь в інших проектах, то переносимо його в Без проєкту
                        user = ProjectParticipants.objects.filter(user=deleted_participant).first()
                        user.project = rezerv_project
                        user.save()
                    project.participants.filter(user=deleted_participant).delete()
                else:
                    # приділяємо в Без проєкту якщо проектів крім цього немає
                    user = ProjectParticipants.objects.get(user=deleted_participant)
                    user.project = rezerv_project
                    user.save()
            return super().destroy(request, *args, **kwargs)


class ProjectsApplication(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = self.queryset.exclude(title="Без проєкту")
        return queryset

    @swagger_auto_schema(**project_application_doc)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
