from django.db.models import F, Func, IntegerField, Value
from django_filters import rest_framework as filters

from dashboard.models import Participant


class ParticipantFilter(filters.FilterSet):
    stack = filters.CharFilter(field_name="stack", lookup_expr="icontains")
    role = filters.CharFilter(field_name="role__title", lookup_expr="iexact")
    search = filters.CharFilter(method="custom_search")
    experience = filters.CharFilter(method="custom_experience")
    type = filters.CharFilter(field_name="type__title", lookup_expr="iexact")

    def custom_experience(self, queryset, name, value):
        if value == "Так":
            return queryset.filter(experience=True)
        elif value == "Ні":
            return queryset.filter(experience=False)
        else:
            return queryset.none()

    def custom_search(self, queryset, name, value):
        queryset = queryset.filter(last_name__icontains=value)
        annotated_queryset = queryset.annotate(
            f_position=Func(
                F("last_name"),
                Value(value),
                function="INSTR",
                output_field=IntegerField(),
            )
        ).order_by("f_position")
        return annotated_queryset

    class Meta:
        model = Participant
        fields = ("search",)
