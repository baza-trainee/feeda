import json
import os
from django.template.loader import render_to_string
from .filters import *
from django.core.mail import send_mail
from rest_framework import generics
from django_filters import rest_framework as filters
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from django.contrib.admin.views.decorators import staff_member_required
from django.core.mail import EmailMessage
from django.core.exceptions import PermissionDenied
from rest_framework import permissions, status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import *
from .serializer import *
from ..users.models import CustomUser
from django.conf import settings
from djoser import serializers
import requests


@swagger_auto_schema(
    method='POST',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'first_name': openapi.Schema(type=openapi.TYPE_STRING),
            'last_name': openapi.Schema(type=openapi.TYPE_STRING),
            'speciality': openapi.Schema(type=openapi.TYPE_STRING),
            'phone_number': openapi.Schema(type=openapi.TYPE_INTEGER),
            'email': openapi.Schema(type=openapi.FORMAT_EMAIL),
            'account_discord': openapi.Schema(type=openapi.TYPE_STRING),
            'account_linkedin': openapi.Schema(type=openapi.TYPE_STRING),
            'city': openapi.Schema(type=openapi.TYPE_STRING),
            'experience': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            'project': openapi.Schema(type=openapi.TYPE_STRING),
            'conditions_participation': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            'processing_personal_data': openapi.Schema(type=openapi.TYPE_BOOLEAN)
        },
        required=[
            'first_name', 'last_name', 'speciality', 'phone_number', 'email', 'account_discord',
            'account_linkedin', 'city', 'experience', 'project', 'conditions_participation', 'processing_personal_data'
        ]
    ),
    responses={
        status.HTTP_201_CREATED: openapi.Response(description='Join successfully'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
    }
)
@permission_classes([permissions.AllowAny])
@api_view(['POST'])
def join_project(request):
    """Заявка користувача для приєднання"""
    serializer = JoinUserProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='POST',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'first_name': openapi.Schema(type=openapi.TYPE_STRING),
            'last_name': openapi.Schema(type=openapi.TYPE_STRING),
            'speciality': openapi.Schema(type=openapi.TYPE_STRING),
            'phone_number': openapi.Schema(type=openapi.TYPE_INTEGER),
            'email': openapi.Schema(type=openapi.FORMAT_EMAIL),
            'account_discord': openapi.Schema(type=openapi.TYPE_STRING),
            'account_linkedin': openapi.Schema(type=openapi.TYPE_STRING),
            'city': openapi.Schema(type=openapi.TYPE_STRING),
            'experience': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            'project': openapi.Schema(type=openapi.TYPE_STRING),
            'stack': openapi.Schema(type=openapi.TYPE_STRING),
            'conditions_participation': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            'processing_personal_data': openapi.Schema(type=openapi.TYPE_BOOLEAN)
        },
        required=[
            'first_name', 'last_name', 'speciality', 'phone_number', 'email', 'account_discord',
            'account_linkedin', 'city', 'experience', 'project', 'conditions_participation', 'processing_personal_data'
        ]
    ),
    responses={
        status.HTTP_201_CREATED: openapi.Response(description='Join successfully'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
    }
)
@api_view(['POST'])
def add_participant(request):
    if not request.user.is_superuser:
        raise PermissionDenied('You are not an administrator.')

    serializer = AddParticipantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='GET',
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='User success',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Invalid data user',
        ),
    }
)
@api_view(['GET'])
def get_participant(request, id):
    participant = Participant.objects.get(id=id)
    serializer = DetailParticipantSerializer(participant, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
@api_view(['GET'])
def send_email(request, id):
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    user = Participant.objects.get(id=id)
    user_email = user.email
    letter = TemplateLatter.objects.get(id=1)
    pdf_file = letter.pdf_file
    subject = 'Welcome Baza Trainee Ukraine'
    from_email = settings.EMAIL_HOST_USER
    to_email = user_email

    # file_name = str(os.path.basename(pdf_file))
    email = EmailMessage(subject, letter.letter, from_email, [to_email])

    if pdf_file:
        with open(pdf_file.path, 'rb') as f:
            email.attach(pdf_file.name, f.read(), 'application/pdf')

    email.send()
    return Response({'message': 'Email message send!'})


@swagger_auto_schema(
    methods=['PUT'],
    request_body=ParticipantUpdateDeleteSerializer,
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Participant retrieved successfully',
            schema=ParticipantUpdateDeleteSerializer,
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Project not found',
        ),
    }
)
@swagger_auto_schema(
    methods=['DELETE'],
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Project deleted successfully',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Project not found',
        ),
    }
)
@permission_classes([permissions.IsAdminUser])
@api_view(['PUT', 'DELETE'])
def detail_participant(request, id):
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    try:
        participant = Participant.objects.get(id=id)
        if request.method == 'PUT':
            serializer = ParticipantUpdateDeleteSerializer(participant, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            participant.delete()
            return Response(status=status.HTTP_200_OK)
    except Participant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@permission_classes([permissions.IsAdminUser])
@api_view(['GET'])
def get_all_participant(request):
    """Список всіх учасників"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    participants = Participant.objects.all()
    serializer = AllParticipantsSerializer(participants, many=True)
    return Response(serializer.data)


@swagger_auto_schema(
    methods=['DELETE'],
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Participant deleted successfully',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Participant not found',
        ),
    }
)
@permission_classes([permissions.IsAdminUser])
@api_view(['DELETE'])
def delete_participant(request, id):
    """Видалити учасника"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    try:
        participant = Participant.objects.get(id=id)
        participant.delete()
        return Response(status=status.HTTP_200_OK)
    except Participant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


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
        status.HTTP_201_CREATED: openapi.Response(description='Project created successfully'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input data'),
    }
)
@permission_classes([permissions.IsAdminUser])
@api_view(['POST'])
def create_project(request):
    """Створення нового проекта"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    serializer = CreateProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @swagger_auto_schema(
#     method='PUT',
#     request_body=openapi.Schema(
#         type=openapi.TYPE_OBJECT,
#         properties={
#             'title': openapi.Schema(type=openapi.TYPE_STRING, description='Title of the project'),
#             'comment': openapi.Schema(type=openapi.TYPE_STRING, description='Comment of the project'),
#             'type_project': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the type project'),
#             'complexity': openapi.Schema(type=openapi.TYPE_INTEGER, description='Complexity of the project'),
#             'project_status': openapi.Schema(type=openapi.TYPE_STRING, description='Status of the project'),
#             'start_date_project': openapi.Schema(type=openapi.FORMAT_DATE, description='Start date of the project'),
#             'end_date_project': openapi.Schema(type=openapi.FORMAT_DATE, description='End date of the project'),
#             'address_site': openapi.Schema(type=openapi.TYPE_STRING, description='Address of the project site'),
#             'url': openapi.Schema(type=openapi.TYPE_STRING, description='URL of the project'),
#         },
#         required=['title', 'type_project', 'start_date_project', 'url'],
#     ),
#     responses={
#         status.HTTP_201_CREATED: openapi.Response(
#             description='Project updated successfully',
#             schema=CreateProjectSerializer,
#         ),
#         status.HTTP_400_BAD_REQUEST: openapi.Response(
#             description='Invalid input data',
#         ),
#     }
# )
# @permission_classes([permissions.IsAdminUser])
# @api_view(['PUT'])
# def update_project(request, project_url):
#     project = Projects.objects.get(url=project_url)
#     serializer = CreateProjectSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @authentication_classes([TokenAuthentication])
@permission_classes([permissions.AllowAny])
@api_view(['GET'])
def list_projects(request):
    """Список всіх проектів"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    projects = Projects.objects.all()
    serializer = ProjectsSerializer(projects, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='GET',
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Project retrieved successfully',
            schema=DetailProjectSerializer,
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Project not found',
        ),
    }
)
@swagger_auto_schema(
    methods=['PUT'],
    request_body=DetailProjectSerializer,
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Project retrieved successfully',
            schema=DetailProjectSerializer,
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Project not found',
        ),
    }
)
@swagger_auto_schema(
    methods=['DELETE'],
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Project deleted successfully',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Project not found',
        ),
    }
)
@api_view(['GET', 'PUT', 'DELETE'])
def detail_project(request, project_url):
    """Отримання, оновлення, видалення проекта"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    try:
        project = Projects.objects.get(url=project_url)
        if request.method == 'GET':
            serializer = DetailProjectSerializer(project, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = DetailProjectSerializer(project, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            project.delete()
            return Response(status=status.HTTP_200_OK)
    except Projects.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(
    method='POST',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'user': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_STRING)),
            'project': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=[
            'project'
        ],
    ),
    responses={
        status.HTTP_201_CREATED: openapi.Response(description='Command created successfully'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid data provided'),
    },
)
# @permission_classes([permissions.IsAdminUser])
@api_view(['POST'])
def create_command(request):
    """Створення команди"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    serializer = CreateProjectParticipantsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @authentication_classes([TokenAuthentication])
# @permission_classes([permissions.IsAdminUser])
# @staff_member_required()
@api_view(['GET'])
def commands_list(request):
    """Список всіх команд"""

    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    project_participants = ProjectParticipants.objects.all()
    serializer = ProjectParticipantsSerializer(project_participants, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    methods=['PUT'],
    request_body=CreateProjectParticipantsSerializer,
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Command retrieved successfully',
            schema=DetailProjectSerializer,
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Command not found',
        ),
    }
)
# @permission_classes([permissions.IsAdminUser])
@api_view(['PUT'])
def command_update(request, id):
    """Оновлення даних команди"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    try:
        command = ProjectParticipants.objects.get(id=id)
        serializer = UpdateProjectParticipantsSerializer(command, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except ProjectParticipants.DoesNotExist:
        return Response({"message": "no such command was found"}, status=status.HTTP_404_NOT_FOUND)


@permission_classes([permissions.IsAdminUser])
@api_view(['DELETE'])
def delete_command(request, id):
    """Видалити команду"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    try:
        command = ProjectParticipants.objects.get(id=id)
        command.delete()
        return Response(status=status.HTTP_200_OK)
    except ProjectParticipants.DoesNotExist:
        return Response({"message": "no such command was found"}, status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(
    method='GET',
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Participant deleted successfully',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Participant not found',
        ),
    }
)
@permission_classes([permissions.IsAdminUser])
@api_view(['GET'])
def filter_participant_list(request):
    """Фільтрація учасників по ключовим словам"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    participants = Participant.objects.all()
    participants_filter = ParticipantFilter(request.GET, queryset=participants)
    serializer = ParticipantFilerSerializer(participants_filter.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='GET',
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Project deleted successfully',
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(
            description='Project not found',
        ),
    }
)
@api_view(['GET'])
def filter_project_list(request):
    """Фільтрація прроектів"""
    if not request.user.is_superuser:
        raise PermissionDenied("You are not an administrator.")

    projects = Projects.objects.all()
    projects_filter = ProjectsFilter(request.GET, queryset=projects)
    serializer = ProjectsSerializer(projects_filter.qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
