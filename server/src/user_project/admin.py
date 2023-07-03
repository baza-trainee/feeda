from django.contrib import admin
from .models import *


@admin.register(Participant)
class JoinProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'project')


@admin.register(Projects)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    prepopulated_fields = {'url': ('title',)}

