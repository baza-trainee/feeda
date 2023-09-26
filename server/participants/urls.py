from django.urls import include, path
from rest_framework.routers import DefaultRouter

from participants.views import ParticipantAPIView, GeneratePDF, EmailSend
from participants.viewsets import ParticipantViewSet

router = DefaultRouter()
router.register("", ParticipantViewSet, basename="participants")

urlpatterns = [
    path("generate-email/", GeneratePDF.as_view(), name="generate_email"),
    path("send-email/<uuid:id>", EmailSend.as_view(), name="send_email"),
    path("application/", ParticipantAPIView.as_view(), name="application"),
    path("", include(router.urls)),
]
