from django.urls import include, path

urlpatterns = [
    path("project/", include("projects.urls")),
    path("participant/", include("participants.urls")),
    path("users/", include("src.users.urls")),
]
