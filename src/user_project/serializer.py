from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import *


class SpecialitySerializer(serializers.ModelSerializer):
    """Спеціальніст учасника"""
    class Meta:
        model = Speciality
        fields = '__all__'


class TypeParticipantSerializer(serializers.ModelSerializer):
    """Тип учасника"""
    class Meta:
        model = TypeParticipant
        fields = '__all__'


class JoinUserProjectSerializer(serializers.ModelSerializer):
    """Реєстрація учасника"""
    account_discord = serializers.CharField(
        max_length=25,
        validators=[RegexValidator(r'^\w+#\d{4}$', 'Invalid Discord username format')]
    )
    project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all(), many=True, write_only=True)
    # type_participant = TypeParticipantSerializer()
    # project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all())

    class Meta:
        model = Participant
        exclude = ('stack', 'comment')


class DetailProjectAddParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'title')


class AddParticipantSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(min_length=2)
    last_name = serializers.CharField(min_length=2)
    account_discord = serializers.CharField(min_length=7)
    account_linkedin = serializers.CharField(min_length=19)
    stack = serializers.CharField(required=True, min_length=2)
    city = serializers.CharField(min_length=2)
    # speciality = serializers.PrimaryKeyRelatedField(queryset=Speciality.objects.all())
    # project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all())

    class Meta:
        model = Participant
        # fields = ('id', 'first_name', 'last_name', 'comment', 'phone_number', 'speciality')
        exclude = ('conditions_participation', 'processing_personal_data')


class ParticipantUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        exclude = ('conditions_participation', 'processing_personal_data')


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

    # participants_count = serializers.IntegerField()
    participants_count = serializers.SerializerMethodField()
    complexity = ComplexitySerializer()
    type_project = TypeProjectSerializer()
    project_status = StatusProjectSerializer()
    # type_project = TypeProjectSerializer()

    # def get_participants_count(self, obj):
    #     return ProjectParticipants.objects.filter(project=obj).count()

    def get_participants_count(self, obj):
        return obj.participant_set.count()

    class Meta:
        model = Projects
        fields = (
            'id', 'title', 'type_project', 'project_status', 'complexity', 'participants_count'
        )


class DetailProjectSerializer(serializers.ModelSerializer):
    """Детальна інформація про проект"""

    type_project = TypeProjectSerializer(read_only=True)
    complexity = ComplexitySerializer(read_only=True)
    project_status = StatusProjectSerializer(read_only=True)

    class Meta:
        model = Projects
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.type_project = validated_data.get('type_project', instance.type_project)
        instance.complexity = validated_data.get('complexity', instance.complexity)
        instance.project_status = validated_data.get('project_status', instance.project_status)
        instance.start_date_project = validated_data.get('start_date_project', instance.start_date_project)
        instance.end_date_project = validated_data.get('end_date_project', instance.end_date_project)
        instance.address_site = validated_data.get('address_site', instance.address_site)
        instance.url = validated_data.get('url', instance.url)
        # instance.participants.set(validated_data.get('participants', instance.participants))
        instance.save()
        return instance


class AllParticipantsSerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer()
    # project = ProjectParticipantDetailSerializer()
    project_count = serializers.SerializerMethodField()
    type_participant = TypeParticipantSerializer()

    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name', 'stack', 'type_participant', 'experience', 'speciality', 'project_count')

    def get_project_count(self, obj):
        return obj.project.count()

    # def get_project_count(self, obj):
    #     return obj.project_set.count()


class ParticipantFilerSerializer(serializers.ModelSerializer):
    project = DetailProjectSerializer()
    speciality = SpecialitySerializer()

    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name', 'speciality', 'experience', 'stack', 'project')


class ProjectParticipantsSerializer(serializers.ModelSerializer):
    user = JoinUserProjectSerializer(many=True)
    project = ProjectsSerializer()
    project_participants = serializers.SerializerMethodField()

    class Meta:
        model = ProjectParticipants
        fields = ('id', 'user', 'project', 'project_participants')

    def get_project_participants(self, obj):
        return obj.user.all().count()


class CreateProjectParticipantsSerializer(serializers.ModelSerializer):
    # user = JoinUserProjectSerializer(many=True)
    user = serializers.PrimaryKeyRelatedField(many=True, queryset=Participant.objects.all(), required=False)
    project = ProjectsSerializer(read_only=True)

    class Meta:
        model = ProjectParticipants
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # representation = super(CreateProjectParticipantsSerializer).to_representation(instance)
        representation['user'] = JoinUserProjectSerializer(instance.user.all(), many=True).data
        return representation


class UpdateProjectParticipantsSerializer(serializers.ModelSerializer):
    """Серіалайзер оновлення команди"""
    user = serializers.PrimaryKeyRelatedField(many=False, queryset=Participant.objects.all(), required=False)
    project = serializers.PrimaryKeyRelatedField(many=False, queryset=ProjectParticipants.objects.all(), required=True)

    class Meta:
        model = ProjectParticipants
        fields = ('user', 'project')


class ProjectParticipantDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'title')


class DetailParticipantSerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer()
    project = ProjectParticipantDetailSerializer(many=True, read_only=True)
    type_participant = TypeParticipantSerializer()

    class Meta:
        model = Participant
        # fields = '__all__'
        exclude = ('conditions_participation', 'processing_personal_data')

    # def get_projects(self, obj):
    #     projects = Projects.objects.all()
    #     return ProjectsSerializer(projects, many=True).data



