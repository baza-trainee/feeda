from drf_yasg import openapi
from rest_framework import status

from projects.serializers import ProjectSerializer
from src.users.documentation.schemas_settings import AUTH_TOKEN_SCHEMA

project_doc_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "title": openapi.Schema(type=openapi.TYPE_STRING, description="Title"),
        "comment": openapi.Schema(type=openapi.TYPE_STRING, description="Comment", max_length=255),
        "type": openapi.Schema(type=openapi.TYPE_STRING, description="Type", min_length=1),
        "complexity": openapi.Schema(type=openapi.TYPE_INTEGER, description="Complexity"),
        "status": openapi.Schema(type=openapi.TYPE_STRING, description="Status", max_length=255),
        "start_date_project": openapi.Schema(type=openapi.FORMAT_DATE, description="start_date_project"),
        "end_date_project": openapi.Schema(type=openapi.FORMAT_DATE, description="end_date_project"),
        "address_site": openapi.Schema(type=openapi.TYPE_STRING, description="address_site"),
        "slug": openapi.Schema(type=openapi.TYPE_STRING, description="slug"),
        "participants": openapi.Schema(
            type=openapi.TYPE_OBJECT,
            description="",
            properties={
                "users": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    description="Учасники",
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        description="Дані учасника",
                        properties={
                            "first_name": openapi.Schema(type=openapi.TYPE_STRING, description="Ім'я"),
                            "last_name": openapi.Schema(type=openapi.TYPE_STRING, description="Прізвище"),
                            "comment": openapi.Schema(type=openapi.TYPE_STRING, description="Комент"),
                            "role": openapi.Schema(type=openapi.TYPE_STRING, description="Роль"),
                        },
                        required=["first_name", "last_name"]
                    )
                ),
                "team_leads": openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    description="Тім Ліди",
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        description="Дані Тім Ліда",
                        properties={
                            "first_name": openapi.Schema(type=openapi.TYPE_STRING, description="Ім'я"),
                            "last_name": openapi.Schema(type=openapi.TYPE_STRING, description="Прізвище"),
                            "comment": openapi.Schema(type=openapi.TYPE_STRING, description="Комент"),
                            "role": openapi.Schema(type=openapi.TYPE_STRING, description="Роль"),
                        },
                        required=["first_name", "last_name"]
                    )
                ),

            },
        ),
    },
    required=["title", "type", "complexity", "status", "start_date_project"],
)

project_doc_list_parameters = [
    AUTH_TOKEN_SCHEMA,
    openapi.Parameter(
        name="type",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_STRING,
        description="Фільтрація проектів по типу",
        required=False,
    ),
    openapi.Parameter(
        name="status",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_STRING,
        description="Фільтрація проектів по статусу",
        required=False,
    ),
    openapi.Parameter(
        name="search",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_STRING,
        description="Пошук проектів по назві",
        required=False,
    ),
    openapi.Parameter(
        name="limit",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_INTEGER,
        description="Кількість проектів на сторінці",
        required=False,
    ),
    openapi.Parameter(
        name="offset",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_STRING,
        description="Початковий індекс, за яким будуть повертатися результати",
        required=False,
    ),
]
projects_doc = {
    "list": {"operation_description": "Список всіх проектів",
             "manual_parameters": project_doc_list_parameters, },
    "create": {
        "operation_description": "Створення Проекту з користувачами або без, Щоб створити без тімлідів або користувачів"
                                 "залиште : users: [], team_leads: []",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "request_body": project_doc_schema,
        "responses": {status.HTTP_401_UNAUTHORIZED: "Unauthorized", status.HTTP_403_FORBIDDEN: "Forbidden"},
    },
    "retrieve": {
        "operation_description": "Вибір проекту за слагом",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "responses": {
            status.HTTP_200_OK: openapi.Response(
                description="Successful response",
                schema=project_doc_schema
            ),
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт"
        },
    },
    "update": {
        "operation_description": "Повна зміна Проекту, всі поля які обов'язкові потрібно передати."
                                 "Для того щоб видалити учасників потрібно лишити пусті списки. Наприклад 'users': []",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "request_body": project_doc_schema,
        "responses": {
            status.HTTP_200_OK: openapi.Response(
                description="Successful response",
                schema=project_doc_schema
            ),
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт"
        },
    },
    "partial_update": {
        "operation_description": "Часткова зміна проекту, можна змінити любе поле проекту, або учасників.",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "request_body": project_doc_schema,
        "responses": {
            status.HTTP_200_OK: openapi.Response(
                description="Successful response",
                schema=project_doc_schema
            ),
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт"
        },
    },
    "destroy": {
        "operation_description": "Удаляє проект з учасниками",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "responses": {status.HTTP_401_UNAUTHORIZED: "Unauthorized", status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт"},
    }
}

project_application_doc = {
    "operation_description": "Список всіх проектів для анкети",
    "tags": ["projects for application"],
    "responses": {
        status.HTTP_200_OK: openapi.Response(
            description="Successful response",
            schema=ProjectSerializer
        ),
    }
}
