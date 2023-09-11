import json
import os
import django_filters.rest_framework
from django.shortcuts import render
from django.template.loader import render_to_string
from .filters import *
from django.core.mail import send_mail
from rest_framework import generics
from django_filters import rest_framework as filters
from django.http import JsonResponse, HttpResponse
from django.db.models import Q
from django.db import transaction
from django.db.models.functions import Lower
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, views
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.core.exceptions import PermissionDenied
from rest_framework import permissions, status, filters
from drf_yasg.utils import swagger_auto_schema, swagger_serializer_method
from drf_yasg import openapi
from django.template.loader import render_to_string, get_template
from django.utils.html import strip_tags
from .paginations import ProjectsAndParticipantsPagination
from .models import *
from .serializer import *
from ..users.models import CustomUser
from django.conf import settings
from djoser import serializers
import requests


class SpecialityList(generics.ListAPIView):
    queryset = Speciality.objects.all()
    serializer_class = SpecialitySerializer


class TypeParticipantList(generics.ListAPIView):
    queryset = TypeParticipant.objects.all()
    serializer_class = TypeParticipantSerializer


class TypesProjectList(generics.ListAPIView):
    queryset = TypeProject.objects.all()
    serializer_class = TypeProjectSerializer


class StatusProjectList(generics.ListAPIView):
    queryset = StatusProject.objects.all()
    serializer_class = StatusProjectSerializer


# @swagger_auto_schema(
#     method='POST',
#     request_body=openapi.Schema(
#         type=openapi.TYPE_OBJECT,
#         properties={
#             'first_name': openapi.Schema(type=openapi.TYPE_STRING),
#             'last_name': openapi.Schema(type=openapi.TYPE_STRING),
#             'stack': openapi.Schema(type=openapi.TYPE_STRING),
#             'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
#             'email': openapi.Schema(type=openapi.FORMAT_EMAIL),
#             'account_discord': openapi.Schema(type=openapi.TYPE_STRING),
#             'account_linkedin': openapi.Schema(type=openapi.TYPE_STRING),
#             'city': openapi.Schema(type=openapi.TYPE_STRING),
#             'experience': openapi.Schema(type=openapi.TYPE_BOOLEAN),
#             'type_participant': openapi.Schema(type=openapi.TYPE_INTEGER),
#             'project': openapi.Schema(type=openapi.TYPE_INTEGER),
#             'conditions_participation': openapi.Schema(type=openapi.TYPE_BOOLEAN),
#             'processing_personal_data': openapi.Schema(type=openapi.TYPE_BOOLEAN)
#         },
#         required=[
#             'first_name', 'last_name', 'stack', 'phone_number', 'email', 'account_discord',
#             'account_linkedin', 'city', 'experience', 'project', 'type_participant', 'conditions_participation', 'processing_personal_data'
#         ]
#     ),
#     responses={
#         status.HTTP_201_CREATED: openapi.Response(
#             description='Join successfully',
#             schema=JoinUserProjectSerializer
#         ),
#         status.HTTP_400_BAD_REQUEST: openapi.Response(
#             description='Invalid input data',
#             schema=openapi.Schema(
#                 type=openapi.TYPE_OBJECT,
#                 properties={
#                     'message': openapi.Schema(type=openapi.TYPE_STRING)
#                 }
#             )
#         ),
#     }
# )
# @permission_classes([permissions.AllowAny])
# @api_view(['POST'])
# def join_project(request):
#     """Заявка користувача для приєднання"""
#     serializer = JoinUserProjectSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         # participant = serializer.save()
#         # project_participant = participant.project.all()
#         # speciality = Speciality.objects.all()
#         # for spec in speciality:
#         #     if spec.title == 'None':
#         #         participant.speciality = spec
#         #         participant.save()
#         # for project in project_participant:
#         #     try:
#         #         command = ProjectParticipants.objects.get(project=project)
#         #         command.user.add(participant)
#         #         command.save()
#         #     except ProjectParticipants.DoesNotExist:
#         #         return Response({'message': 'Project not found'})
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JoinProject(generics.CreateAPIView):
    serializer_class = JoinUserProjectSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @swagger_auto_schema(
#     method='POST',
#     request_body=openapi.Schema(
#         type=openapi.TYPE_OBJECT,
#         properties={
#             'first_name': openapi.Schema(type=openapi.TYPE_STRING),
#             'last_name': openapi.Schema(type=openapi.TYPE_STRING),
#             'speciality': openapi.Schema(type=openapi.TYPE_INTEGER),
#             'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
#             'email': openapi.Schema(type=openapi.FORMAT_EMAIL),
#             'account_discord': openapi.Schema(type=openapi.TYPE_STRING),
#             'account_linkedin': openapi.Schema(type=openapi.TYPE_STRING),
#             'comment': openapi.Schema(type=openapi.TYPE_STRING),
#             'city': openapi.Schema(type=openapi.TYPE_STRING),
#             'experience': openapi.Schema(type=openapi.TYPE_BOOLEAN),
#             'project': openapi.Schema(
#                 type=openapi.TYPE_ARRAY,
#                 items=openapi.Schema(type=openapi.TYPE_INTEGER)
#             ),
#             'type_participant': openapi.Schema(type=openapi.TYPE_STRING),
#             'stack': openapi.Schema(type=openapi.TYPE_STRING)
#         },
#         required=[
#             'first_name', 'last_name', 'speciality', 'phone_number', 'email', 'account_discord',
#             'account_linkedin', 'city', 'experience', 'project', 'conditions_participation', 'processing_personal_data'
#         ]
#     ),
#     responses={
#         status.HTTP_201_CREATED: openapi.Response(
#             description='Join successfully',
#             schema=AddParticipantSerializer()
#         ),
#         status.HTTP_400_BAD_REQUEST: openapi.Response(
#             description='Invalid input data',
#             schema=openapi.Schema(
#                 type=openapi.TYPE_OBJECT,
#                 properties={
#                     'message': openapi.Schema(type=openapi.TYPE_STRING)
#                 }
#             )
#         ),
#     }
# )
# @api_view(['POST'])
# def add_participant(request):
#     """Створення нового учасника з адмін панелі"""
#     if not request.user.is_superuser:
#         raise PermissionDenied('You are not an administrator.')
#
#     serializer = AddParticipantSerializer(data=request.data)
#     if serializer.is_valid():
#         participant = serializer.save()
#         projects_participant = participant.project.all()
#         for project in projects_participant:
#             try:
#                 command = ProjectParticipants.objects.get(project=project)
#                 command.user.add(participant)
#                 command.save()
#             except ProjectParticipants.DoesNotExist:
#                 return Response({'message': 'Command not found'})
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddParticipant(generics.CreateAPIView):
    serializer_class = AddParticipantSerializer
    permission_classes = [permissions.IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(
    method='GET',
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Email send successfully',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Invalid data user',
        ),
    }
)
@api_view(['POST', 'GET'])
def send_template(request, participant_id):
    """Відправка email на пошту учасника"""
    if not request.user.is_superuser:
        raise PermissionDenied('You are not an administrator.')

    if request.method == 'POST':
        letter = TemplateLatter.objects.get(id=1)
        context = {
            'letter': letter.letter,
            'reset': False
        }
        participant = Participant.objects.get(id=participant_id)
        template_letter = render_to_string('email.html', context)
        data_message = strip_tags(template_letter)
        subject = 'Welcome Baza Trainee'
        message = EmailMultiAlternatives(
            subject=subject,
            body=data_message,
            from_email=settings.EMAIL_HOST_USER,
            to=[participant.email]
        )
        message.attach_alternative(template_letter, 'text/html')
        message.send()
        return Response({'message': 'OK'})


class DetailParticipant(generics.GenericAPIView):
    queryset = Participant.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = DetailParticipantSerializer

    def get(self, request, participant_id):
        try:
            participant = Participant.objects.get(id=participant_id)
            serializer = self.serializer_class(participant, many=False)
            return Response(serializer.data)
        except Participant.DoesNotExist:
            return Response({'message': 'Participant not found'})

    def patch(self, request, participant_id):
        try:
            participant = Participant.objects.get(id=participant_id)
            serializer = ParticipantUpdateDeleteSerializer(participant, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Participant.DoesNotExist:
            return Response({'message': 'Participant not found'})

    def delete(self, request, participant_id):
        try:
            participant = Participant.objects.get(id=participant_id)
            participant.delete()
            return Response({'message': 'Participant deleted'})
        except Participant.DoesNotExist:
            return Response({'message': 'Participant not found'})


class GetAllParticipants(generics.ListAPIView):
    queryset = Participant.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AllParticipantsSerializer
    pagination_class = ProjectsAndParticipantsPagination

    def list(self, request, *args, **kwargs):
        pass


@swagger_auto_schema(
    method='POST',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING),
            'comment': openapi.Schema(type=openapi.TYPE_STRING, description='Коментарі до проекту'),
            'type_project': openapi.Schema(type=openapi.TYPE_STRING, description='Тип проекту'),
            'complexity': openapi.Schema(type=openapi.TYPE_INTEGER, description='Складність проректу від 1 до 5'),
            'project_status': openapi.Schema(type=openapi.TYPE_STRING, description='Статус проекта'),
            'start_date_project': openapi.Schema(type=openapi.FORMAT_DATE, description='Дата старта проекта'),
            'end_date_project': openapi.Schema(type=openapi.FORMAT_DATE, description='Дата закінчення проекта'),
            'address_site': openapi.Schema(type=openapi.FORMAT_URI, description='Посилання на сайт'),
            'url': openapi.Schema(type=openapi.FORMAT_SLUG, description='Slug для проекта')
        },
        required=[
            'title', 'type_project', 'complexity', 'project_status', 'start_date_project'
        ],  # обов'язкові поля
    ),
    responses={
        status.HTTP_201_CREATED: openapi.Response(
            description='Project created successfully',
            schema=CreateProjectSerializer
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Response(
            description='Invalid input data',
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
    }
)
@permission_classes([permissions.IsAdminUser])
@api_view(['POST'])
def create_project(request):
    """Створення нового проекта"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    project = CreateProjectSerializer(data=request.data)
    if project.is_valid():
        new_project = project.save()
        command_data = {
            'project': new_project.id
        }
        command = CreateProjectParticipantsSerializer(data=command_data)
        if command.is_valid():
            command.save()
            return Response(
                {
                    'project': project.data,
                    'command': command.data
                },
                status=status.HTTP_201_CREATED)
        else:
            return Response(project.data, status=status.HTTP_201_CREATED)
    else:
        return Response(project.errors, status=status.HTTP_400_BAD_REQUEST)


class ListProjects(generics.ListAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = ProjectsAndParticipantsPagination


class DetailCreateUpdateDeleteProject(generics.GenericAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = DetailProjectSerializer

    def get(self, request, project_id):
        try:
            projects = Projects.objects.get(id=project_id)
            serializer = self.serializer_class(projects, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Projects.DoesNotExist:
            return Response({'message': 'Participant not found'})

    def post(self, request):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, project_id):
        try:
            project = Projects.objects.get(id=project_id)
            serializer = DetailProjectSerializer(project, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Projects.DoesNotExist:
            return Response({'message': 'Project not found'})

    def delete(self, project_url):
        try:
            project = Projects.objects.get(url=project_url)
            currents_participants = Participant.objects.filter(project=project)
            new_project = Projects.objects.get(title='None')
            currents_participants.project.add(new_project)
            project.delete()
        except Projects.DoesNotExist:
            return Response({'message': 'Project not found'})


class TeamsList(generics.ListAPIView):
    queryset = ProjectParticipants.objects.all()
    serializer_class = ProjectParticipantsSerializer
    permission_classes = [permissions.IsAdminUser]


class TeamProjectDetail(generics.GenericAPIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, project_url):
        try:
            project = Projects.objects.get(url=project_url)
            team = ProjectParticipants.objects.get(project=project)
            serializer = ProjectParticipantDetailSerializer(team, many=False)
            return Response(serializer.data)
        except Projects.DoesNotExist:
            return Response({'message': 'Team not found'})

    def put(self, request, team_id):
        try:
            team = ProjectParticipants.objects.get(id=team_id)
            serializer = UpdateProjectParticipantsSerializer(team, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ProjectParticipants.DoesNotExist:
            return Response({'message': 'Team not found'})

    def delete(self, request, team_id):
        try:
            team = ProjectParticipants.objects.get(id=team_id)
            team.delete()
            return Response({'message': 'Delete'})
        except ProjectParticipants.DoesNotExist:
            return Response({'message': 'Team not found'})


# @swagger_auto_schema(
#     methods=['PUT'],
#     request_body=UpdateProjectParticipantsSerializer,
#     responses={
#         status.HTTP_200_OK: openapi.Response(
#             description='Command retrieved successfully',
#             schema=UpdateProjectParticipantsSerializer,
#         ),
#         status.HTTP_404_NOT_FOUND: openapi.Response(
#             description='Command not found',
#             schema=openapi.Schema(
#                 type=openapi.TYPE_OBJECT,
#                 properties={
#                     'message': openapi.Schema(type=openapi.TYPE_STRING)
#                 }
#             )
#         ),
#     }
# )
# # @permission_classes([permissions.IsAdminUser])
# @api_view(['PUT'])
# def command_update(request, id):
#     """Оновлення даних команди"""
#     if not request.user.is_superuser:
#         raise PermissionDenied("You are not an administrator.")
#
#     try:
#         data_users = request.data
#         command = ProjectParticipants.objects.get(id=id)
#         serializer = UpdateProjectParticipantsSerializer(command, data=data_users)
#         print(data_users)
#         for user in data_users:
#             print(user)
#         if serializer.is_valid():
#             serializer.save()
#             users = data_users['user']
#             project = data_users['project']
#             for user_id in users:
#                 try:
#                     participant = Participant.objects.get(id=user_id)
#                     participant.project.add(project)
#                     participant.save()
#                 except Participant.DoesNotExist:
#                     return Response({'message': 'Participant not found'})
#             if 'comments' in data_users:
#                 comments = data_users['comments']
#                 for comment_id in comments:
#                     for user_id in users:
#                         if comment_id == user_id:
#                             participant = Participant.objects.get(id=user_id)
#                             participant.comment = comments[user_id]
#                             participant.save()
#             if 'speciality' in data_users:
#                 speciality = data_users['speciality']
#                 print('speciality', speciality)
#                 for speciality_id in speciality:
#                     for user_id in users:
#                         spec_id = speciality[speciality_id]
#                         print('speciality id:', speciality_id)
#                         new_speciality = Speciality.objects.get(id=spec_id)
#                         participant = Participant.objects.get(id=user_id)
#                         participant.speciality = new_speciality
#                         participant.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     except ProjectParticipants.DoesNotExist:
#         return Response({"message": "no such command was found"}, status=status.HTTP_404_NOT_FOUND)


class SearchFilterParticipant(generics.ListAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantFilerSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter]
    pagination_class = ProjectsAndParticipantsPagination
    filterset_class = ParticipantFilter
    search_fields = ['stack', 'last_name', 'speciality__title']


class SearchFilterProjects(generics.ListAPIView):
    queryset = Projects.objects.all()
    serializer_class = SearchProjectsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ProjectsFilter
    search_fields = ['title']


def downland_swagger(request):
    url = 'http://127.0.0.1:8000/swagger.json'
    response = requests.get(url)

    if response.status_code == 200:
        json_schema = response.json()
        json_string = json.dumps(json_schema, indent=4)

        filename = 'swagger.json'
        response = HttpResponse(json_string, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        return response
    else:
        return Response(status=response.status_code)

