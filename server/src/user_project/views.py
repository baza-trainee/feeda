import json

from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import *
from .serializer import *
import requests


@swagger_auto_schema(
    method='POST',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'first_name': openapi.Schema(type=openapi.TYPE_STRING),
            'last_name': openapi.Schema(type=openapi.TYPE_STRING),
            'specialization': openapi.Schema(type=openapi.TYPE_STRING),
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
            'first_name', 'last_name', 'specialization', 'phone_number', 'email', 'account_discord',
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


@permission_classes([permissions.IsAdminUser])
@api_view(['GET'])
def list_projects(request):
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
@permission_classes([permissions.IsAdminUser])
@api_view(['GET', 'PUT', 'DELETE'])
def detail_project(request, project_url):
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
