from django.urls import include, path
from rest_framework.routers import DefaultRouter

from projects.views import ProjectsApplication, ProjectViewSet

router = DefaultRouter()
router.register("", ProjectViewSet, basename="projects")

urlpatterns = [
    path("application/", ProjectsApplication.as_view(), name="project_application"),
    path("", include(router.urls)),
]
