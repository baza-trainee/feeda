from django.db import models
from django.utils.text import slugify
from phonenumber_field.modelfields import PhoneNumberField
import uuid


class TemplateLatter(models.Model):
    letter = models.TextField()
    pdf_file = models.FileField(upload_to='files/')

    def __str__(self):
        return f'{self.letter}'


class TypeProject(models.Model):
    project_type = models.CharField(max_length=15)

    def __str__(self):
        return self.project_type


class Complexity(models.Model):
    complexity = models.CharField(max_length=25)

    def __str__(self):
        return f'{self.complexity}'


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
    type_project = models.ForeignKey(TypeProject, blank=True, null=True, on_delete=models.PROTECT)
    complexity = models.ForeignKey(Complexity, blank=True, null=True, on_delete=models.CASCADE)
    project_status = models.ForeignKey(StatusProject, blank=True, null=True, on_delete=models.CASCADE)
    start_date_project = models.DateField()
    end_date_project = models.DateField(blank=True, null=True)
    address_site = models.URLField(blank=True, null=True, max_length=30)
    url = models.SlugField(unique=True, db_index=True, max_length=30)
    # participants = models.ManyToManyField(
    #     'Participant',
    #     blank=True,
    #     null=True,
    #     related_name='project_participants'
    # )

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.url:
            self.url = slugify(self.title)
        super().save(*args, **kwargs)

    # def participants_count(self):
    #     return self.participants.all().count()


class Participant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=50)
    comment = models.CharField(max_length=50, blank=True, null=True)
    phone_number = PhoneNumberField()
    email = models.EmailField(max_length=70)
    account_discord = models.CharField(max_length=37)
    account_linkedin = models.CharField(max_length=128)
    city = models.CharField(max_length=50, blank=True, null=True)
    experience = models.BooleanField(default=False)
    speciality = models.ForeignKey(Speciality, blank=True, null=True, on_delete=models.PROTECT)
    stack = models.CharField(max_length=50, blank=True, null=True)
    project = models.ManyToManyField(Projects, blank=True)
    type_participant = models.ForeignKey(
        TypeParticipant,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name='project_set'
    )
    conditions_participation = models.BooleanField(default=False)
    processing_personal_data = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.speciality}'


class ProjectParticipants(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ManyToManyField(Participant, blank=True, null=True)
    project = models.ForeignKey(
        Projects,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='project_participants'
    )

    def __str__(self):
        return f'{self.user} - {self.project}'

    # def user_count(self):
    #     return self.user.all().count
