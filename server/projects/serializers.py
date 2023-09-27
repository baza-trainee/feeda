from rest_framework import serializers

from dashboard.models import (Participant, Project, ProjectParticipants, Role,
                              StatusProject, TypeProject)


class ProjectSerializer(serializers.ModelSerializer):
    """ серіалізатор для списку проектів"""
    type = serializers.SlugRelatedField(slug_field="title", queryset=TypeProject.objects.all())
    status = serializers.SlugRelatedField(slug_field="name", queryset=StatusProject.objects.all())
    count_participants = serializers.SerializerMethodField()

    def get_count_participants(self, obj):
        return obj.participants.all().count()

    class Meta:
        model = Project
        fields = "__all__"


class ProjectParticipantsSerializer(serializers.ModelSerializer):
    """ Серіалізатор для учасників проекту"""
    id = serializers.CharField(source='user.id', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    comment = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)
    role = serializers.SlugRelatedField(slug_field="title", queryset=Role.objects.all(), required=False)

    class Meta:
        model = ProjectParticipants
        fields = ("id", "user", "first_name", "last_name", "comment", "role", "project", "team_lead")
        extra_kwargs = {
            'user': {'write_only': True},
            'team_lead': {'write_only': True, "required": False},
            'project': {'write_only': True}
        }

    # def validate_user(self, value):
    #     # провірка щоб не додати того самого 2 рази в користувачі
    #
    #     team_lead = self.initial_data.get("team_lead", None)
    #     project = Project.objects.get(id=self.initial_data.get("project"))
    #     user_without_team_lead = project.participants.filter(user=value, team_lead=False).count()
    #     user_with_team_lead = project.participants.filter(user=value, team_lead=True).count()
    #
    #     if not team_lead and user_without_team_lead == 1:
    #         raise serializers.ValidationError("Цей користувач вже пов'язаний з проектом.")
    #     elif team_lead and user_with_team_lead == 1:
    #         raise serializers.ValidationError("Цей користувач вже пов'язаний з проектом як лідер команди.")
    #     return value


class RetrieveProjectSerializer(serializers.ModelSerializer):
    """ серіалізатор для одного проекту, з учасниками"""
    type = serializers.SlugRelatedField(slug_field="title", queryset=TypeProject.objects.all())
    status = serializers.SlugRelatedField(slug_field="name", queryset=StatusProject.objects.all())
    slug = serializers.SlugField(required=False)
    participants = ProjectParticipantsSerializer(many=True, read_only=True)
    comment = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'comment',
            'type',
            "complexity",
            "start_date_project",
            "end_date_project",
            'status',
            "address_site",
            "slug",
            "participants"
        )


class ReturnParticipantInfoSerializer(serializers.ModelSerializer):
    """ серіалізатор який повертає дані про учасника в проекті"""
    first_name = serializers.SlugRelatedField(source="user", slug_field="first_name", read_only=True)
    last_name = serializers.SlugRelatedField(source="user", slug_field="last_name", read_only=True)
    role = serializers.SlugRelatedField(slug_field="title", queryset=Role.objects.all(), required=False)

    class Meta:
        model = ProjectParticipants
        fields = ("first_name", "last_name", "comment", "role")
