import uuid
import attr
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.response import Response
from django.core.validators import RegexValidator
from .models import *


class SpecialitySerializer(serializers.ModelSerializer):
    """Спеціальніст учасника"""

    class Meta:
        model = Speciality
        fields = '__all__'


class SpecialityField(serializers.RelatedField):
    """Поле виведення спеціалізації"""

    def to_representation(self, value):
        return SpecialitySerializer(value).data

    def to_internal_value(self, data):
        try:
            speciality = Speciality.objects.get(id=data)
            return speciality
        except Speciality.DoesNotExist:
            raise serializers.ValidationError('Speciality not found')


class TypeParticipantSerializer(serializers.ModelSerializer):
    """Тип учасника"""

    class Meta:
        model = TypeParticipant
        fields = '__all__'


class TypeProjectSerializer(serializers.ModelSerializer):
    """Тип проекта"""

    class Meta:
        model = TypeProject
        fields = '__all__'


class ComplexitySerializer(serializers.ModelSerializer):
    """Складність проекта"""

    class Meta:
        model = Complexity
        fields = '__all__'


class StatusProjectSerializer(serializers.ModelSerializer):
    """Статус проекта"""

    class Meta:
        model = StatusProject
        fields = '__all__'


class DetailProjectSerializer(serializers.ModelSerializer):
    """Детальна інформація про проект"""

    type_project = serializers.PrimaryKeyRelatedField(queryset=TypeProject.objects.all(), many=False, required=False)
    complexity = serializers.PrimaryKeyRelatedField(queryset=Complexity.objects.all(), many=False, required=False)
    project_status = serializers.PrimaryKeyRelatedField(
        queryset=StatusProject.objects.all(),
        many=False,
        required=False
    )

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

        instance.save()
        return instance


class ProjectField(serializers.RelatedField):
    """Поля для виведення об'єкта проекта"""

    def to_representation(self, value):
        return DetailProjectSerializer(value).data

    def to_internal_value(self, data):
        try:
            project = Projects.objects.get(id=data)
            return project
        except Projects.DoesNotExist:
            return serializers.ValidationError('Project not found')


class JoinUserProjectSerializer(serializers.ModelSerializer):
    """Реєстрація учасника"""
    first_name = serializers.CharField(min_length=2, max_length=50)
    last_name = serializers.CharField(min_length=2, max_length=50)
    account_discord = serializers.CharField(
        min_length=2,
        max_length=37
    )
    account_linkedin = serializers.CharField(min_length=19, max_length=128)
    city = serializers.CharField(min_length=2, max_length=50, required=False)
    project = ProjectField(queryset=Projects.objects.all(), many=True)
    stack = serializers.CharField(required=True, min_length=2, max_length=300)
    conditions_participation = serializers.BooleanField()
    processing_personal_data = serializers.BooleanField()
    type_participant = serializers.PrimaryKeyRelatedField(queryset=TypeParticipant.objects.all())
    speciality = SpecialityField(read_only=True)

    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name', 'account_discord', 'account_linkedin',
                  'city', 'conditions_participation', 'processing_personal_data',
                  'type_participant', 'phone_number', 'email', 'experience',
                  'project', 'stack', 'speciality')

    def validate(self, attrs):
        conditions_participation = attrs.get('conditions_participation')
        processing_personal_data = attrs.get('processing_personal_data')
        account_discord = attrs.get('account_discord')
        project = attrs.get('project')

        try:
            username_discord, discriminator_discord = account_discord.split('#')

            if len(username_discord) < 2:
                raise serializers.ValidationError('Minimum length 2 for the username discord')
        except:
            pass

        if conditions_participation is not True or processing_personal_data is not True:
            raise serializers.ValidationError('Both conditions_participation and processing_personal_data must be True')

        if len(project) > 1 or len(project) < 1:
            raise serializers.ValidationError('You can only select one project')

        return attrs

    def create(self, validated_data):
        speciality = validated_data.pop('speciality', None)
        project_ids = validated_data.pop('project', [])
        if speciality is None:
            try:
                speciality = Speciality.objects.get(title='None')
                participant = Participant.objects.create(speciality=speciality, **validated_data)
                for project_id in project_ids:
                    try:
                        project = Projects.objects.get(pk=project_id)
                        participant.project.add(project)
                    except Projects.DoesNotExist:
                        pass
                projects_participant = participant.project.all()
                for project in projects_participant:
                    try:
                        command = ProjectParticipants.objects.get(project=project)
                        command.user.add(participant)
                        command.save()
                    except ProjectParticipants.DoesNotExist:
                        return Response({'message': 'Team Not found'})
                return participant
            except Speciality.DoesNotExist:
                return Response({'message': 'Speciality not found'})


class DetailProjectAddParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'title')


class AddParticipantSerializer(serializers.ModelSerializer):
    """Реєстрація нового учасника адміном"""

    first_name = serializers.CharField(min_length=2, max_length=20)
    last_name = serializers.CharField(min_length=2, max_length=20)
    account_discord = serializers.CharField(min_length=2, max_length=37)
    account_linkedin = serializers.CharField(min_length=19, max_length=128)
    stack = serializers.CharField(required=True, min_length=2, max_length=300)
    city = serializers.CharField(min_length=2, max_length=50, required=False)
    speciality = serializers.PrimaryKeyRelatedField(queryset=Speciality.objects.all(), required=True)
    project = ProjectField(queryset=Projects.objects.all(), many=True)

    # project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all(), many=True, required=True)

    class Meta:
        model = Participant
        exclude = ('conditions_participation', 'processing_personal_data')

    def create(self, validated_data):
        project_ids = validated_data.pop('project', [])
        participant = Participant.objects.create(**validated_data)
        for project_id in project_ids:
            try:
                project = Projects.objects.get(id=project_id)
                print(project)
                participant.project.add(project)
            except Projects.DoesNotExist:
                pass
        for project_id in project_ids:
            try:
                project = Projects.objects.get(id=project_id)
                team, created = ProjectParticipants.objects.get_or_create(project=project)
                team.user.add(participant)
                team.save()
            except Projects.DoesNotExist:
                pass

        return participant


class TypeParticipantField(serializers.RelatedField):
    """Поля для отримання об'єкта типа учасника"""

    def to_representation(self, value):
        return TypeParticipantSerializer(value).data

    def to_internal_value(self, data):
        try:
            type_participant = TypeParticipant.objects.get(id=data)
            return type_participant
        except TypeParticipant.DoesNotExist:
            raise serializers.ValidationError('Type participant not found')


class ParticipantUpdateDeleteSerializer(serializers.ModelSerializer):
    """Оновлення учасника"""

    type_participant = TypeParticipantField(queryset=TypeParticipant.objects.all(), required=False)
    speciality = SpecialityField(queryset=Speciality.objects.all(), required=False)
    project = ProjectField(queryset=Projects.objects.all(), many=True, required=False)

    class Meta:
        model = Participant
        exclude = ('conditions_participation', 'processing_personal_data')

    def update(self, instance, validated_data):
        project = validated_data.pop('project', [])
        instance.type_participant = validated_data.get('type_participant', instance.type_participant)
        instance.speciality = validated_data.get('speciality', instance.speciality)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        instance.account_discord = validated_data.get('account_discord', instance.account_discord)
        instance.account_linkedin = validated_data.get('account_linkedin', instance.account_linkedin)
        instance.city = validated_data.get('city', instance.city)
        instance.experience = validated_data.get('experience', instance.experience)
        instance.speciality = validated_data.get('speciality', instance.speciality)
        instance.stack = validated_data.get('stack', instance.stack)
        instance.project.set(project)
        instance.conditions_participation = validated_data.get(
            'conditions_participation', instance.conditions_participation
        )
        instance.processing_personal_data = validated_data.get(
            'processing_personal_data', instance.processing_personal_data
        )
        instance.save()
        return instance


class ParticipantsProjectSerializer(serializers.ModelSerializer):
    """Список учасників на проекті"""

    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name', 'email')


class SendEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateLatter
        fields = '__all__'


class CreateProjectSerializer(serializers.ModelSerializer):
    """Створення проекта"""

    url = serializers.SlugField(required=False)
    title = serializers.CharField(min_length=1, max_length=30)

    class Meta:
        model = Projects
        fields = '__all__'

    def create(self, validated_data):
        project = Projects.objects.create(**validated_data)
        team_data = {
            'project': project.id
        }
        team_serializer = CreateProjectParticipantsSerializer(data=team_data)
        if team_serializer.is_valid():
            team_serializer.save()
        return project


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
            'id', 'title', 'type_project', 'project_status', 'complexity', 'participants_count', 'url'
        )


class AllParticipantsSerializer(serializers.ModelSerializer):
    """Отримання всіх проектів"""
    speciality = SpecialitySerializer()
    # project = ProjectParticipantDetailSerializer()
    project_count = serializers.SerializerMethodField()
    type_participant = TypeParticipantSerializer()
    url = serializers.SlugField(read_only=True)

    class Meta:
        model = Participant
        fields = (
            'id', 'first_name', 'last_name', 'stack', 'type_participant',
            'experience', 'speciality', 'project_count', 'url'
        )

    def get_project_count(self, obj):
        return obj.project.count()

    # def get_project_count(self, obj):
    #     return obj.project_set.count()


class ParticipantFilerSerializer(serializers.ModelSerializer):
    """Фільтрація проектів"""
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
    """Список всіх команд"""
    user = JoinUserProjectSerializer(many=True, required=False)
    project = ProjectsSerializer()
    project_participants = serializers.SerializerMethodField()

    class Meta:
        model = ProjectParticipants
        fields = ('id', 'user', 'project', 'project_participants')

    def get_project_participants(self, obj):
        return obj.user.all().count()


class ProjectDetailField(serializers.RelatedField):
    """Об'єкт проекта"""

    def to_representation(self, value):
        return DetailProjectSerializer(value).data

    def to_internal_value(self, data):
        try:
            project_id = data
            project = Projects.objects.get(id=project_id)
            return project
        except Projects.DoesNotExist:
            raise serializers.ValidationError('Project with the specified ID does not exist')


class TeamLead(serializers.RelatedField):
    """Об'єкт тімліда"""

    def to_representation(self, value):
        return JoinUserProjectSerializer(value).data

    def to_internal_value(self, data):
        try:
            participant = Participant.objects.get(id=data)
            return participant
        except Participant.DoesNotExist:
            raise serializers.ValidationError('Participant not found')


class CreateProjectParticipantsSerializer(serializers.ModelSerializer):
    """Створення команди"""
    user = serializers.PrimaryKeyRelatedField(many=True, queryset=Participant.objects.all(), required=False)
    # team_lead = serializers.PrimaryKeyRelatedField(queryset=Participant.objects.all(), required=False)
    team_lead = TeamLead(queryset=Participant.objects.all(), many=True, required=False)
    project = ProjectDetailField(queryset=Projects.objects.all(), many=False, required=True)

    class Meta:
        model = ProjectParticipants
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = AddParticipantSerializer(instance.user.all(), many=True).data
        return representation

    def create(self, validated_data):
        user_data = validated_data.pop('user', [])
        team_lead_data = validated_data.pop('team_lead', [])
        project = validated_data.pop('project')
        instance = ProjectParticipants.objects.create(project=project, **validated_data)

        if user_data:
            instance.user.set(user_data)
        if team_lead_data:
            instance.team_lead.set(team_lead_data)

        return instance


class ProjectParticipantListSerializer(serializers.ModelSerializer):
    """Список всіх команд"""

    class Meta:
        model = ProjectParticipants
        fields = '__all__'


class ParticipantsDetailSerializer(serializers.ModelSerializer):
    """Інформація про команду"""

    class Meta:
        model = Participant
        fields = ('id', 'first_name', 'last_name')


class ParticipantDataField(serializers.RelatedField):
    def to_representation(self, value):
        return JoinUserProjectSerializer(value).data

    def to_internal_value(self, data):
        try:
            participant = Participant.objects.get(id=data)
            return participant
        except Participant.DoesNotExist:
            raise serializers.ValidationError('Participant not found')


class UpdateProjectParticipantsSerializer(serializers.ModelSerializer):
    """Оновлення команди"""
    user = ParticipantDataField(queryset=Participant.objects.all(), many=True, required=False)
    team_lead = ParticipantDataField(queryset=Participant.objects.all(), many=True, required=False)
    project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all(), many=False, required=True)
    comments = serializers.DictField(child=serializers.CharField(write_only=True, max_length=50), required=False)
    speciality = serializers.DictField(child=serializers.CharField(write_only=True), required=False)

    # comment = serializers.DictField(
    #     child=serializers.CharField(min_length=1, max_length=50, required=False)
    # )

    class Meta:
        model = ProjectParticipants
        fields = ('user', 'team_lead', 'project', 'comments', 'speciality')

    def update(self, instance, validated_data):
        user = validated_data.pop('user', None)
        team_lead = validated_data.pop('team_lead', None)
        comments = validated_data.pop('comments', None)
        speciality = validated_data.pop('speciality', None)

        if user is not None:
            instance.user.set(user)

        if team_lead is not None:
            instance.team_lead.set(team_lead)

        if comments is not None:
            for user_id, comment_text in comments.items():
                participant = Participant.objects.get(id=user_id)
                participant.comment = comment_text
                participant.save()

        if speciality is not None:
            for user_id, speciality_id in speciality.items():
                participant = Participant.objects.get(id=user_id)
                new_speciality = Speciality.objects.get(id=speciality_id)
                participant.speciality = new_speciality
                participant.save()
        return instance


class ProjectParticipantDetailSerializer(serializers.ModelSerializer):
    project = DetailProjectSerializer()
    user = AddParticipantSerializer(many=True)
    team_lead = AddParticipantSerializer(many=True)

    class Meta:
        model = ProjectParticipants
        fields = '__all__'


class DetailParticipantSerializer(serializers.ModelSerializer):
    """Детальна інформація про учасника"""
    speciality = SpecialitySerializer()
    project = DetailProjectSerializer(many=True, read_only=True)
    type_participant = TypeParticipantSerializer()

    class Meta:
        model = Participant
        exclude = ('conditions_participation', 'processing_personal_data')


class SearchProjectsSerializer(serializers.ModelSerializer):
    """Пошук проектів"""

    class Meta:
        model = Projects
        fields = ('id', 'title')
