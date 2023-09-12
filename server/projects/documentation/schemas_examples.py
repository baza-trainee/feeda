from drf_yasg import openapi
from rest_framework import status

from projects.serializers import (ProjectParticipantsSerializer,
                                  RetrieveProjectSerializer)

project_create_schema_param = {
    "operation_description": "Create Project",
    "responses": {
        status.HTTP_200_OK: openapi.Response(
            description="Successful response", examples={"application/json": "Some Example"},
            schema=RetrieveProjectSerializer
        ),
        status.HTTP_404_NOT_FOUND: openapi.Response(description="Not found"),
    },
    "operation_id": "create",
}