from django.db import models
from django.utils.text import slugify
import uuid


class TemplateLatter(models.Model):
    letter = models.TextField()
    pdf_file = models.FileField(upload_to='')

    def __str__(self):
        return f'{self.letter}'


class TypeProject(models.Model):
    project_type = models.CharField(max_length=50)

    def __str__(self):
        return self.project_type


class Complexity(models.Model):
    complexity = models.IntegerField(default=1)

    def __str__(self):
        return self.complexity


class StatusProject(models.Model):
    status = models.CharField(max_length=20)

    def __str__(self):
        return self.status


class Speciality(models.Model):
    title = models.CharField(max_length=20)

    def __str__(self):
        return self.title


class TypeParticipant(models.Model):
    title = models.CharField(max_length=20)

    def __str__(self):
        return self.title


class Projects(models.Model):
    title = models.CharField(max_length=100)
    comment = models.TextField(blank=True, null=True)
    type_project = models.ForeignKey(TypeProject, blank=True, null=True, on_delete=models.PROTECT)
    complexity = models.ForeignKey(Complexity, blank=True, null=True, on_delete=models.CASCADE)
    project_status = models.ForeignKey(StatusProject, blank=True, null=True, on_delete=models.CASCADE)
    start_date_project = models.DateField()
    end_date_project = models.DateField(blank=True, null=True)
    address_site = models.URLField(blank=True, null=True)
    url = models.SlugField(unique=True, db_index=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.url:
            self.url = slugify(self.title)
        super().save(*args, **kwargs)


class Participant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    phone_number = models.IntegerField()
    email = models.EmailField(unique=True)
    account_discord = models.CharField(max_length=25)
    account_linkedin = models.CharField(max_length=150)
    city = models.CharField(max_length=25)
    experience = models.BooleanField(default=False)
    speciality = models.ForeignKey(Speciality, blank=True, null=True, on_delete=models.PROTECT)
    project = models.ForeignKey(Projects, blank=True, null=True, on_delete=models.PROTECT)
    type_participant = models.ForeignKey(TypeParticipant, blank=True, null=True, on_delete=models.PROTECT)
    conditions_participation = models.BooleanField(default=False)
    processing_personal_data = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.speciality}'


class Command(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(Participant, blank=True, null=True, on_delete=models.CASCADE)
    project = models.ForeignKey(Projects, blank=True, null=True, on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.user} - {self.project}'

