from django.urls import path
from django.conf.urls.static import static
from .views import *


urlpatterns = [
    path('status-project-list/', StatusProjectList.as_view()),
    path('types-project-list/', TypesProjectList.as_view()),
    path('types-participant-list/', TypeParticipantList.as_view()),
    path('speciality-list/', SpecialityList.as_view()),
    path('join/', JoinProject.as_view()),
    path('add-participant/', AddParticipant.as_view()),
    path('participants-list/', GetAllParticipants.as_view()),
    path('participant-detail/<uuid:participant_id>/', DetailParticipant.as_view()),
    path('send-email/<uuid:participant_id>/', send_template),
    path('detail-project/<project_url>/', DetailCreateUpdateDeleteProject.as_view()),
    path('project/', DetailCreateUpdateDeleteProject.as_view()),
    path('projects/', ListProjects.as_view()),
    path('commands/', TeamsList.as_view()),
    path('command-project-detail/<str:project_url>/', TeamProjectDetail.as_view()),
    path('command-update-delete/<team_id>', TeamProjectDetail.as_view()),
    path('search-user/', SearchFilterParticipant.as_view()),
    path('search-filter-projects/', SearchFilterProjects.as_view()),
    path('down/', downland_swagger),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
