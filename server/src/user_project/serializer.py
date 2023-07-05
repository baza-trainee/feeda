from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import *


class JoinUserProjectSerializer(serializers.ModelSerializer):
    account_discord = serializers.CharField(
        max_length=25,
        validators=[RegexValidator(r'^\w+#\d{4}$', 'Invalid Discord username format')]
    )

    class Meta:
        model = Participant
        fields = '__all__'


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects.objects.all()
        fields = ('id', 'title', 'start_date_project', 'complexity')


class DetailProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'
