from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError

from dashboard.models import (
    Participant,
    Project,
    ProjectParticipants,
    Role,
    TypeParticipant,
)

from participants.validation import validate_discord_username, validate_linkedin_account


class ParticipantApplicationSerializer(serializers.ModelSerializer):
    """Серіалізатор на заповнення анкети"""

    type = serializers.SlugRelatedField(
        slug_field="title", queryset=TypeParticipant.objects.all()
    )
    role = serializers.SlugRelatedField(
        slug_field="title", queryset=Role.objects.all(), required=False
    )
    first_name = serializers.CharField(min_length=2, max_length=20)
    last_name = serializers.CharField(min_length=2, max_length=50)
    email = serializers.EmailField(min_length=6, max_length=70)
    comment = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)
    city = serializers.CharField(min_length=2, max_length=50, allow_blank=True, allow_null=True)
    stack = serializers.CharField(min_length=2, max_length=300)

    def validate(self, attrs):
        account_discord = attrs.get("account_discord")
        account_linkedin = attrs.get("account_linkedin")
        if not validate_discord_username(account_discord):
            raise ValidationError("Invalid Discord username format")

        if not validate_linkedin_account(account_linkedin):
            raise ValidationError("Invalid LinkedIn account format")

        if (
                attrs.get("conditions_participation") is not True
                or attrs.get("processing_personal_data") is not True
        ):
            raise serializers.ValidationError("Both conditions_participation and processing_personal_data must be True")
        return attrs

    class Meta:
        model = Participant
        fields = "__all__"
        extra_kwargs = {
            "conditions_participation": {"write_only": True},
            "processing_personal_data": {"write_only": True},
        }


class ParticipantSerializer(serializers.ModelSerializer):
    """Серіалізатор на створення юзера через адмін панель"""

    type = serializers.SlugRelatedField(
        slug_field="title", queryset=TypeParticipant.objects.all()
    )
    role = serializers.SlugRelatedField(
        slug_field="title", queryset=Role.objects.all(), required=False
    )

    first_name = serializers.CharField(min_length=2, max_length=20)
    last_name = serializers.CharField(min_length=2, max_length=50)
    email = serializers.EmailField(min_length=6, max_length=70)
    comment = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)
    city = serializers.CharField(min_length=2, max_length=50, required=False, allow_blank=True, allow_null=True)
    stack = serializers.CharField(min_length=2, max_length=300)

    def validate(self, attrs):
        account_discord = attrs.get("account_discord", None)
        account_linkedin = attrs.get("account_linkedin", None)
        if account_linkedin and account_discord is not None:
            if not validate_discord_username(account_discord):
                raise ValidationError("Invalid Discord username format")

            if not validate_linkedin_account(account_linkedin):
                raise ValidationError("Invalid LinkedIn account format")

        return attrs

    class Meta:
        model = Participant
        fields = "__all__"
        extra_kwargs = {
            "conditions_participation": {"write_only": True},
            "processing_personal_data": {"write_only": True},
        }


class ListParticipantSerializer(serializers.ModelSerializer):
    """Серіалізатор на створення юзера через адмін панель"""

    type = serializers.SlugRelatedField(
        slug_field="title", queryset=TypeParticipant.objects.all()
    )
    role = serializers.SlugRelatedField(
        slug_field="title", queryset=Role.objects.all(), required=False
    )

    count_projects = serializers.SerializerMethodField()

    def get_count_projects(self, obj):
        return obj.all_projects.all().count()

    class Meta:
        model = Participant
        fields = "__all__"
        extra_kwargs = {
            "conditions_participation": {"write_only": True},
            "processing_personal_data": {"write_only": True},
        }


class RetrieveParticipantSerializer(serializers.ModelSerializer):
    """отримання інфи про проекти"""

    project = serializers.SlugRelatedField(slug_field="title", read_only=True)
    id = serializers.SlugRelatedField(source="project", slug_field="pk", read_only=True)

    class Meta:
        model = ProjectParticipants
        fields = ("project", "id")
