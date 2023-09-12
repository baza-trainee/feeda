from drf_yasg import openapi
from rest_framework import status

from participants.serializers import ParticipantSerializer
from src.users.documentation.schemas_settings import AUTH_TOKEN_SCHEMA

participant_application_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "first_name": openapi.Schema(type=openapi.TYPE_STRING, description="Name"),
        "last_name": openapi.Schema(
            type=openapi.TYPE_STRING, description="LastName", max_length=255
        ),
        "comment": openapi.Schema(
            type=openapi.TYPE_STRING, description="Comment", min_length=1
        ),
        "phone_number": openapi.Schema(type=openapi.TYPE_STRING, description="Phone"),
        "email": openapi.Schema(
            type=openapi.TYPE_STRING, description="Email", max_length=255
        ),
        "account_discord": openapi.Schema(
            type=openapi.TYPE_STRING, description="Discord"
        ),
        "account_linkedin": openapi.Schema(
            type=openapi.TYPE_STRING, description="LinkedIn"
        ),
        "city": openapi.Schema(type=openapi.TYPE_STRING, description="City"),
        "experience": openapi.Schema(
            type=openapi.TYPE_BOOLEAN, description="experience"
        ),
        "stack": openapi.Schema(type=openapi.TYPE_STRING, description="Stack"),
        "type": openapi.Schema(type=openapi.TYPE_STRING, description="Type"),
        "conditions_participation": openapi.Schema(
            type=openapi.TYPE_BOOLEAN, description="conditions_participation"
        ),
        "processing_personal_data": openapi.Schema(
            type=openapi.TYPE_BOOLEAN, description="processing_personal_data"
        ),
        "project": openapi.Schema(type=openapi.TYPE_INTEGER, description="Project"),
    },
    required=[
        "first_name",
        "last_name",
        "stack",
        "phone_number",
        "email",
        "account_discord",
        "account_linkedin",
        "experience",
        "type",
        "project",
    ],
)

participant_admin_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "first_name": openapi.Schema(type=openapi.TYPE_STRING, description="Name"),
        "last_name": openapi.Schema(
            type=openapi.TYPE_STRING, description="LastName", max_length=255
        ),
        "comment": openapi.Schema(
            type=openapi.TYPE_STRING, description="Comment", min_length=1
        ),
        "phone_number": openapi.Schema(type=openapi.TYPE_STRING, description="Phone"),
        "email": openapi.Schema(
            type=openapi.TYPE_STRING, description="Email", max_length=255
        ),
        "account_discord": openapi.Schema(
            type=openapi.TYPE_STRING, description="Discord"
        ),
        "account_linkedin": openapi.Schema(
            type=openapi.TYPE_STRING, description="LinkedIn"
        ),
        "city": openapi.Schema(type=openapi.TYPE_STRING, description="City"),
        "experience": openapi.Schema(
            type=openapi.TYPE_BOOLEAN, description="experience"
        ),
        "stack": openapi.Schema(type=openapi.TYPE_STRING, description="Stack"),
        "role": openapi.Schema(type=openapi.TYPE_STRING, description="Role"),
        "type": openapi.Schema(type=openapi.TYPE_STRING, description="Type"),
        "projects": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            description="",
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="ід проектів",
                properties={
                    "project": openapi.Schema(
                        type=openapi.TYPE_INTEGER, description="id проекту"
                    )
                },
            ),
        ),
    },
    required=[
        "first_name",
        "last_name",
        "stack",
        "phone_number",
        "email",
        "account_discord",
        "account_linkedin",
        "experience",
        "type",
        "projects"
    ],
)
participant_doc_list_parameters = [
    AUTH_TOKEN_SCHEMA,
    openapi.Parameter(
        name="search",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_STRING,
        description="Пошук користувачів по прізвищу",
        required=False,
    ),
    openapi.Parameter(
        name="limit",
        in_=openapi.IN_QUERY,
        type=openapi.TYPE_INTEGER,
        description="Кількість користувачів на сторінці",
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

participants_doc = {
    "list": {
        "operation_description": "Список всіх Користувачів",
        "manual_parameters": participant_doc_list_parameters,
    },
    "create": {
        "operation_description": "Створення Користувача",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "request_body": participant_admin_schema,
        "responses": {
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
        },
    },
    "retrieve": {
        "operation_description": "Вибір користувача за id",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "responses": {
            status.HTTP_200_OK: openapi.Response(
                description="Successful response", schema=participant_admin_schema
            ),
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт",
        },
    },
    "update": {
        "operation_description": "Повна зміна користувача, всі поля які обов'язкові потрібно передати.",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "request_body": participant_admin_schema,
        "responses": {
            status.HTTP_200_OK: openapi.Response(
                description="Successful response", schema=participant_admin_schema
            ),
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт",
        },
    },
    "partial_update": {
        "operation_description": "Часткова зміна користувача, можна змінити любе поле.",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "request_body": participant_admin_schema,
        "responses": {
            status.HTTP_200_OK: openapi.Response(
                description="Successful response", schema=participant_admin_schema
            ),
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_403_FORBIDDEN: "Forbidden",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт",
        },
    },
    "destroy": {
        "operation_description": "Видалення користувача",
        "manual_parameters": [AUTH_TOKEN_SCHEMA],
        "responses": {
            status.HTTP_401_UNAUTHORIZED: "Unauthorized",
            status.HTTP_404_NOT_FOUND: "Не знайдено об'єкт",
        },
    },
}
participant_application_doc = {
    "operation_description": "Заповнення Анкети.",
    "tags": ["Application"],
    "request_body": participant_application_schema,
    "responses": {
        status.HTTP_201_CREATED: openapi.Response(
            description="Object has been created successfully"
        ),
    },
}
