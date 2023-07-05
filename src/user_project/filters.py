import django_filters
from django_filters import rest_framework as filters
from .models import *


class ProjectsFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = Projects
        fields = ('title', )
