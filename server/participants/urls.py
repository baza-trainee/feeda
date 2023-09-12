from django.urls import include, path
from rest_framework.routers import DefaultRouter

from participants.views import ParticipantAPIView
from participants.viewsets import ParticipantViewSet

router = DefaultRouter()
router.register("", ParticipantViewSet, basename="participants")

urlpatterns = [
    path("application/", ParticipantAPIView.as_view(), name="application"),
    path("", include(router.urls)),
]
