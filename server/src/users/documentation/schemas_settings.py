from drf_yasg import openapi

AUTH_TOKEN_SCHEMA = openapi.Parameter(
    name="Authorization",
    in_=openapi.IN_HEADER,
    type=openapi.TYPE_STRING,
    description="Bearer token for authentication",
    required=True,
    example="Bearer 5aa7eb4403faa4bca8048c4781831cdce2c11337",
)