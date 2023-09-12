from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from dashboard.models import (
    Participant,
    Project,
    ProjectParticipants,
    Role,
    TypeParticipant,
)


class ParticipantApplicationSerializer(serializers.ModelSerializer):
    """Серіалізатор на заповнення анкети"""

    type = serializers.SlugRelatedField(
        slug_field="title", queryset=TypeParticipant.objects.all()
    )
    role = serializers.SlugRelatedField(
        slug_field="title", queryset=Role.objects.all(), required=False
    )

    def validate(self, attrs):
        user = Participant.objects.filter(email=attrs.get("email")).first()
        if user:
            raise ValidationError("User with this email already exists")

        account_discord = attrs.get("account_discord")
        account_linkedin = attrs.get("account_linkedin")
        try:
            parts = account_discord.split("#")
            if len(parts) != 2:
                raise ValidationError("Invalid Discord username format")
        except Exception:
            raise ValidationError("Invalid Discord username format")

        if not account_linkedin.startswith("https://www.linkedin.com/in/"):
            raise ValidationError("Invalid LinkedIn account URL")

        if (
            attrs.get("conditions_participation") is not True
            or attrs.get("processing_personal_data") is not True
        ):
            raise serializers.ValidationError(
                "Both conditions_participation and processing_personal_data must be True"
            )
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

    def validate(self, attrs):
        user = Participant.objects.filter(email=attrs.get("email")).first()
        if user:
            raise ValidationError("User with this email already exists")

        account_discord = attrs.get("account_discord", None)
        account_linkedin = attrs.get("account_linkedin", None)
        if account_linkedin and account_discord is not None:
            try:
                parts = account_discord.split("#")
                if len(parts) != 2:
                    raise ValidationError("Invalid Discord username format")
            except Exception:
                raise ValidationError("Invalid Discord username format")

            if not account_linkedin.startswith("https://www.linkedin.com/in/"):
                raise ValidationError("Invalid LinkedIn account URL")
        return attrs

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

    class Meta:
        model = ProjectParticipants
        fields = ("project",)
