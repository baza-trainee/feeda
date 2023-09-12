from django.db.models import F, Func, IntegerField, Value
from django_filters import rest_framework as filters

from dashboard.models import Participant


class ParticipantFilter(filters.FilterSet):
    search = filters.CharFilter(method="custom_search")

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
