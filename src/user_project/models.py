from django.db import models
import uuid


class TemplateLetter(models.Model):
    letter = models.TextField()
    pdf_file = models.FileField(upload_to='')

    def __str__(self):
        return f'{self.letter}'


class TypeProject(models.Model):
    project_type = models.CharField(max_length=15)

    def __str__(self):
        return self.project_type


class Complexity(models.Model):
    complexity = models.CharField(max_length=25)

    def __str__(self):
        return self.complexity


class StatusProject(models.Model):
    status = models.CharField(max_length=20)

    def __str__(self):
        return self.status


class Speciality(models.Model):
    title = models.CharField(max_length=8)

    def __str__(self):
        return self.title


class TypeParticipant(models.Model):
    title = models.CharField(max_length=12)

    def __str__(self):
        return self.title


class Projects(models.Model):
    title = models.CharField(max_length=50)
    comment = models.TextField(blank=True, null=True, max_length=50)
    id_type_project = models.ForeignKey(TypeProject, blank=True, null=True, on_delete=models.PROTECT)
    id_complexity = models.ForeignKey(Complexity, blank=True, null=True, on_delete=models.CASCADE)
    id_status_project = models.ForeignKey(StatusProject, blank=True, null=True, on_delete=models.CASCADE)
    start_date_project = models.DateField()
    end_date_project = models.DateField(blank=True, null=True)
    address_site = models.URLField(blank=True, null=True, max_length=30)
    url = models.SlugField(unique=True, db_index=True, max_length=30)

    def __str__(self):
        return self.title


class Participant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13)
    email = models.EmailField(unique=True, max_length=70)
    account_discord = models.CharField(max_length=37)
    account_linkedin = models.CharField(max_length=128)
    country = models.CharField(max_length=50)
    experience = models.BooleanField(default=False)
    stack = models.CharField(max_length=300)
    id_speciality = models.ForeignKey(Speciality, blank=True, null=True, on_delete=models.PROTECT)
    id_type_participant = models.ForeignKey(TypeParticipant, blank=True, null=True, on_delete=models.PROTECT)
    conditions_participation = models.BooleanField(default=False)
    processing_personal_data = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.speciality}'


class ProjectParticipants(models.Model):
    project = models.ForeignKey(Projects, blank=True, null=True, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.project_id} {self.participant_id}'