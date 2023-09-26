from drf_yasg import openapi
from rest_framework import status

AUTH_TOKEN_SCHEMA = openapi.Parameter(
    name="Authorization",
    in_=openapi.IN_HEADER,
    type=openapi.TYPE_STRING,
    description="Bearer token for authentication",
    required=True,
    example="Bearer 5aa7eb4403faa4bca8048c4781831cdce2c11337",
)

token_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "token": openapi.Schema(type=openapi.TYPE_STRING, description="Token"),
    }
)

password_reset_doc_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "email": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_EMAIL, description="Email"),
    }
)

password_reset_confirm_doc_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "uidb64": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_BASE64, description="uidb64"),
        "password": openapi.Schema(type=openapi.TYPE_STRING, description="password"),
        "confirm_password": openapi.Schema(type=openapi.TYPE_STRING, description="repeat password"),
    }
)
token_doc = {
    "operation_description": "Генерація токена доступа",
    "responses": {status.HTTP_200_OK: openapi.Response(
        description="Successful Response",
        schema=token_response
    )}
}

token_delete_doc = {
    "operation_description": "Видалення токена доступа",
    "manual_parameters": [AUTH_TOKEN_SCHEMA],
}

password_reset_doc = {
    "operation_description": "Відправка почти для скидання паролю",
    "request_body": password_reset_doc_schema,
    "responses": {status.HTTP_200_OK: openapi.Response(
        description="Password reset email sent. Please check your email.",
    ), status.HTTP_500_INTERNAL_SERVER_ERROR: openapi.Response(
        description="An error occurred while sending the email. Please try again later."
    )
    }
}

password_reset_complete_doc = {
    "operation_description": "Скидання паролю",
    "request_body": password_reset_confirm_doc_schema,
    "responses": {status.HTTP_200_OK: openapi.Response(
        description="Password has been updated successfully.",
    ), status.HTTP_400_BAD_REQUEST: openapi.Response(
        description="Passwords do not match."
    )
    }
}

check_token_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "uidb64": openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_BASE64, description="uidb64"),
    }
)

check_token_parameters = [
    openapi.Parameter(
        name="token",
        in_=openapi.IN_PATH,
        type=openapi.TYPE_STRING,
        required=True,
    ),
    openapi.Parameter(
        name="uidb64",
        in_=openapi.IN_PATH,
        type=openapi.TYPE_STRING,
        required=True,
    ),
]

check_token_doc = {
    "operation_description": "Провірка Токену",
    "manual_parameters": check_token_parameters,
    "responses": {status.HTTP_200_OK: openapi.Response(
        description="",
        schema=check_token_schema,
    ), status.HTTP_400_BAD_REQUEST: openapi.Response(
        description="invalid token"
    )
    }
}
