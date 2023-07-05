from django.urls import path
from .views import *


urlpatterns = [
    path('join/', join_project),
    path('create-project/', create_project),
    path('projects/', list_projects),
    path('project/<str:project_url>/', detail_project),
    path('command/', create_command),
    path('commands/', commands_list),
    path('command-update/<uuid:id>/', command_update),
    path('command-delete/<uuid:id>/', delete_command),
    path('filter-project/', filter_project_list),
    path('down/', downland_swagger)
]
