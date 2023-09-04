import django_filters
from django_filters import rest_framework as filters
from .serializer import (SpecialitySerializer, ProjectsSerializer, AddParticipantSerializer,
                         TypeParticipantSerializer, StatusProjectSerializer, TypeProjectSerializer)
from .models import *


class ProjectsFilter(django_filters.FilterSet):
    # project = ProjectsSerializer
    project_status = StatusProjectSerializer
    type_project = TypeProjectSerializer
    # title = django_filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Projects
        fields = ('project_status', 'type_project')


class ParticipantFilter(django_filters.FilterSet):
    speciality = SpecialitySerializer
    stack = AddParticipantSerializer
    last_name = AddParticipantSerializer
    experience = AddParticipantSerializer
    type_participant = TypeParticipantSerializer

    class Meta:
        model = Participant
        fields = ('speciality', 'last_name', 'stack', 'experience', 'type_participant')


# class SearchParticipantsFilter(django_filters.FilterSet):
#     class Meta:
#         model = Participant
#         fields = {
#             'field_name_to_search': [
#                 'speciality__title', 'last_name', 'stack',
#                 'experience', 'type_participant__title'
#             ]
#         }
