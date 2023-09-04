from django.urls import path
from django.conf.urls.static import static
from .views import *


urlpatterns = [
    path('status-project-list/', status_project_list),
    path('types-project-list/', types_project_list),
    path('types-participant-list/', types_participant_list),
    path('speciality-list/', speciality_list),
    path('join/', join_project),
    path('add-participant/', add_participant),
    path('participants-list/', get_all_participant),
    path('participant-detail/<uuid:id>/', detail_participant),
    path('get-participant/<uuid:id>/', get_participant),
    # path('send/<uuid:id>/', send_email),
    path('send-email/<uuid:participant_id>/', send_template),
    path('create-project/', create_project),
    path('projects/', list_projects),
    path('project/<str:project_url>/', detail_project),
    # path('command/', create_command),
    path('commands/', commands_list),
    path('command-project-detail/<str:project_url>/', command_project_detail),
    path('command-update/<str:id>/', command_update),
    path('command-delete/<str:id>/', delete_command),
    path('filter-project/', filter_project_list),
    path('search-user/', search),
    path('search-projects/', search_projects),
    path('down/', downland_swagger),
    path('test/', test)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
