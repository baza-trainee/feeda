from django.db.models import F, Func, IntegerField, Value
from django_filters import rest_framework as filters

from dashboard.models import Project


class ProjectFilter(filters.FilterSet):
    type = filters.CharFilter(field_name="type__title", lookup_expr="exact")
    status = filters.CharFilter(field_name="status__name", lookup_expr="exact")
    search = filters.CharFilter(method="custom_search")

    class Meta:
        model = Project
        fields = ("type", "status")

    def custom_search(self, queryset, name, value):
        queryset = queryset.filter(title__icontains=value)
        annotated_queryset = queryset.annotate(
            f_position=Func(
                F('title'),
                Value(value),
                function='INSTR',
                output_field=IntegerField(),
            )
        ).order_by('f_position')
        return annotated_queryset
