from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import *


class TypeParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeParticipant
        fields = '__all__'


class JoinUserProjectSerializer(serializers.ModelSerializer):
    """Реєстрація учасника"""
    account_discord = serializers.CharField(
        max_length=25,
        validators=[RegexValidator(r'^\w+#\d{4}$', 'Invalid Discord username format')]
    )
    # type_participant = TypeParticipantSerializer()
    # project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all())

    class Meta:
        model = Participant
        fields = '__all__'


class ParticipantsProjectSerializer(serializers.ModelSerializer):
    """Список учасників на проекті"""
    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name', 'email')


class TypeProjectSerializer(serializers.ModelSerializer):
    """Тип проекта"""
    class Meta:
        model = TypeProject
        fields = ('project_type',)


class ComplexitySerializer(serializers.ModelSerializer):
    """Складність проекта"""
    class Meta:
        model = Complexity
        fields = ('complexity',)


class StatusProjectSerializer(serializers.ModelSerializer):
    """Статус проекта"""
    class Meta:
        model = StatusProject
        fields = ('status', )


class CreateProjectSerializer(serializers.ModelSerializer):
    """Створення проекта"""

    url = serializers.SlugField(read_only=True)

    class Meta:
        model = Projects
        fields = '__all__'


class ProjectsSerializer(serializers.ModelSerializer):
    """Список всіх проектів"""

    participants_count = serializers.IntegerField()
    complexity = ComplexitySerializer()
    # type_project = TypeProjectSerializer()

    class Meta:
        model = Projects
        fields = ('id', 'title', 'start_date_project', 'complexity', 'participants_count')


class DetailProjectSerializer(serializers.ModelSerializer):
    """Детальна інформація про проект"""

    participants = ParticipantsProjectSerializer(many=True)
    type_project = TypeProjectSerializer()
    complexity = ComplexitySerializer()
    project_status = StatusProjectSerializer()

    class Meta:
        model = Projects
        fields = '__all__'


class AllParticipantsSerializer(serializers.ModelSerializer):
    model = Participant
    fields = '__all__'


class CommandSerializer(serializers.ModelSerializer):
    user = JoinUserProjectSerializer(many=True)
    project = ProjectsSerializer()

    class Meta:
        model = Command
        fields = ('id', 'user', 'project')


class CreateCommandSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=True, queryset=Participant.objects.all(), required=False)
    project = ProjectsSerializer

    class Meta:
        model = Command
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = JoinUserProjectSerializer(instance.user.all(), many=True).data
        return representation
