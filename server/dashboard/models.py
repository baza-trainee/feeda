import uuid

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify
from phonenumber_field.modelfields import PhoneNumberField
from unidecode import unidecode


class Project(models.Model):
    title = models.CharField(max_length=30)
    comment = models.TextField(blank=True, null=True)
    type = models.ForeignKey("TypeProject", on_delete=models.PROTECT)
    complexity = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    status = models.ForeignKey("StatusProject", on_delete=models.PROTECT)
    start_date_project = models.DateField()
    end_date_project = models.DateField(blank=True, null=True)
    address_site = models.URLField(blank=True, null=True, max_length=30)  # ???
    slug = models.SlugField(unique=True, db_index=True, max_length=30)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.title))
        return super().save(*args, **kwargs)


class Participant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    comment = models.TextField(blank=True, null=True)
    phone_number = PhoneNumberField()
    email = models.EmailField()
    account_discord = models.CharField(max_length=37)
    account_linkedin = models.CharField(max_length=128)
    city = models.CharField(max_length=50, blank=True, null=True)
    experience = models.BooleanField(default=False)
    role = models.ForeignKey("Role", blank=True, null=True, on_delete=models.PROTECT)
    stack = models.CharField(max_length=300)
    type = models.ForeignKey(
        "TypeParticipant",
        on_delete=models.PROTECT,
        related_name="participants",  # безкоштовний, платний
    )
    conditions_participation = models.BooleanField(default=False)
    processing_personal_data = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class ProjectParticipants(models.Model):
    user = models.ForeignKey(
        Participant, on_delete=models.CASCADE, related_name="all_projects"
    )
    team_lead = models.BooleanField(default=False)
    role = models.ForeignKey("Role", on_delete=models.PROTECT)
    comment = models.TextField(blank=True, null=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="participants"
    )


class TemplateLatter(models.Model):
    letter = models.TextField()

    def __str__(self):
        return f"{self.letter}"


class TypeProject(models.Model):
    title = models.CharField(max_length=15)

    def __str__(self):
        return self.title


class StatusProject(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Role(models.Model):
    title = models.CharField(max_length=8)

    def __str__(self):
        return self.title


class TypeParticipant(models.Model):
    title = models.CharField(max_length=12)

    def __str__(self):
        return self.title
