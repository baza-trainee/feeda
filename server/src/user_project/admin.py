from django.contrib import admin
from .models import *


@admin.register(Participant)
class JoinProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'project')


@admin.register(Projects)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    prepopulated_fields = {'url': ('title',)}


admin.site.register(TemplateLatter)
admin.site.register(TypeProject)
admin.site.register(Complexity)
admin.site.register(StatusProject)
admin.site.register(Speciality)
admin.site.register(TypeParticipant)

