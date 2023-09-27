from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from feeda.api_urls import urlpatterns


schema_view = get_schema_view(
    openapi.Info(
        title='Feeda',
        default_version='v1',
        description='Baza Trainee UA',
        license=openapi.License(name='BSD License')
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
    patterns=[path("api/v1/", include(urlpatterns))]
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
