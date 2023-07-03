from django.urls import path
from .views import *


urlpatterns = [
    path('join/', join_project),
    path('participant-delete/<uuid:id>/', delete_participant),
    path('create-project/', create_project),
    path('projects/', list_projects),
    path('project/<str:project_url>/', detail_project),
    path('down/', downland_swagger)
]
