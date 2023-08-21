import attr
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
    first_name = serializers.CharField(min_length=2, max_length=20)
    last_name = serializers.CharField(min_length=2, max_length=20)
    account_discord = serializers.CharField(
        min_length=7,
        max_length=37,
        validators=[RegexValidator(r'^\w+#\d{4}$', 'Invalid Discord username format')]
    )
    account_linkedin = serializers.CharField(min_length=19, max_length=128)
    city = serializers.CharField(min_length=2, max_length=50)
    project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all(), many=True, write_only=True)
    stack = serializers.CharField(required=True, min_length=2, max_length=300)
    conditions_participation = serializers.BooleanField()
    processing_personal_data = serializers.BooleanField()
    type_participant = serializers.PrimaryKeyRelatedField(queryset=TypeParticipant.objects.all())
    # type_participant = TypeParticipantSerializer()
    # project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all())

    class Meta:
        model = Participant
        # fields = ('id', 'first_name', 'last_name', 'account_discord', 'account_linkedin',
        #           'city', 'conditions_participation', 'processing_personal_data',
        #           'type_participant', 'phone_number', 'email', 'experience', 'speciality',
        #           'project')
        exclude = ('speciality', 'comment')

    def validate(self, attrs):
        conditions_participation = attrs.get('conditions_participation')
        processing_personal_data = attrs.get('processing_personal_data')
        account_discord = attrs.get('account_discord')
        project = attrs.get('project')

        username_discord, discriminator_discord = account_discord.split('#')

        if len(username_discord) < 2:
            raise serializers.ValidationError('Minimum length 2 for the username discord')

        if conditions_participation is not True or processing_personal_data is not True:
            raise serializers.ValidationError('Both conditions_participation and processing_personal_data must be True')

        if len(project) > 1 or len(project) < 1:
            raise serializers.ValidationError('You can only select one project')

        return attrs


class DetailProjectAddParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'title')


class AddParticipantSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(min_length=2, max_length=20)
    last_name = serializers.CharField(min_length=2, max_length=20)
    account_discord = serializers.CharField(min_length=7, max_length=37)
    account_linkedin = serializers.CharField(min_length=19, max_length=128)
    stack = serializers.CharField(required=True, min_length=2, max_length=300)
    city = serializers.CharField(min_length=2, max_length=50)
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

    type_project = serializers.PrimaryKeyRelatedField(queryset=TypeProject.objects.all(), many=False, required=False)
    complexity = serializers.PrimaryKeyRelatedField(queryset=Complexity.objects.all(), many=False, required=False)
    project_status = serializers.PrimaryKeyRelatedField(
        queryset=StatusProject.objects.all(),
        many=False,
        required=False
    )

    # type_project = TypeProjectSerializer(write_only=True)
    # complexity = ComplexitySerializer(write_only=True)
    # project_status = StatusProjectSerializer(write_only=True)

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

        # data_type_project = instance.type_project = validated_data.pop('type_project', None)
        # data_complexity = instance.complexity = validated_data.pop('complexity', None)
        # data_project_status = instance.project_status = validated_data.pop('project_status', None)
        #
        # if data_type_project is not None:
        #     instance.type_project = TypeProject.objects.get(pk=data_type_project['id'])
        #
        # if data_complexity is not None:
        #     instance.complexity = Complexity.objects.get(pk=data_complexity['id'])
        #
        # if data_project_status is not None:
        #     instance.project_status = StatusProject.objects.get(pk=data_project_status['id'])

        instance.save()
        return instance


class AllParticipantsSerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer()
    # project = ProjectParticipantDetailSerializer()
    project_count = serializers.SerializerMethodField()
    type_participant = TypeParticipantSerializer()

    class Meta:
        model = Participant
        fields = (
            'id', 'first_name', 'last_name', 'stack', 'type_participant',
            'experience', 'speciality', 'project_count'
        )

    def get_project_count(self, obj):
        return obj.project.count()

    # def get_project_count(self, obj):
    #     return obj.project_set.count()


class ParticipantFilerSerializer(serializers.ModelSerializer):
    speciality = SpecialitySerializer()
    type_participant = TypeParticipantSerializer()
    project_count = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name', 'speciality', 'experience',
                  'stack', 'type_participant', 'project_count')


    def get_project_count(self, obj):
        return obj.project.count()


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
    user = serializers.PrimaryKeyRelatedField(many=True, queryset=Participant.objects.all(), required=True)
    project = serializers.PrimaryKeyRelatedField(many=False, queryset=Projects.objects.all(), required=True)

    class Meta:
        model = ProjectParticipants
        fields = ('user', 'project')

    def update(self, instance, validated_data):
        users = validated_data.pop('user', None)
        # project = validated_data.get('project', instance.project)

        if users is not None:
            instance.user.set(users)

        instance.project = validated_data.get('project', instance.project)
        instance.save()

        return instance

        # updated_users = users
        # updated_project = project
        #
        # return {
        #     'user': AllParticipantsSerializer(updated_users, many=True).data,
        #     'project': DetailProjectSerializer(updated_project).data
        # }

    # def update(self, instance, validated_data):
    #     instance.user = validated_data.get('user', instance.user)
    #     instance.project = validated_data.get('project', instance.project)
    #     instance.save()
    #
    #     users = validated_data.get('user')
    #     if users is not None:
    #         instance.user.set(users)
    #     return instance


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


class SearchProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'title')

