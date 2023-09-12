# import django_filters
# from django_filters import rest_framework as filters
# from .serializer import SpecialitySerializer, ProjectsSerializer, AddParticipantSerializer
# from .models import *
#
#
# class ProjectsFilter(django_filters.FilterSet):
#     project = ProjectsSerializer
#     # title = django_filters.CharFilter(lookup_expr='exact')
#
#     class Meta:
#         model = Projects
#         fields = ('title', )
#
#
# class ParticipantFilter(django_filters.FilterSet):
#     speciality = SpecialitySerializer
#     stack = AddParticipantSerializer
#     last_name = AddParticipantSerializer
#
#     class Meta:
#         model = Participant
#         fields = ('speciality', 'last_name', 'stack')
