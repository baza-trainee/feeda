from django.contrib import admin

from .models import *


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "type", "complexity", "status", "start_date_project", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "role", "type", "id")


@admin.register(ProjectParticipants)
class ProjectParticipantsAdmin(admin.ModelAdmin):
    list_display = ("user", "team_lead", "role", "comment", "project")


@admin.register(TypeProject)
class TypeProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title")


@admin.register(StatusProject)
class StatusProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", "title")


@admin.register(TypeParticipant)
class TypeParticipantAdmin(admin.ModelAdmin):
    list_display = ("id", "title")


admin.site.register(TemplateLatter)
