# Generated by Django 4.2.3 on 2023-07-05 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_project', '0002_projects_participants'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='command',
            name='user',
        ),
        migrations.AddField(
            model_name='command',
            name='user',
            field=models.ManyToManyField(to='user_project.participant'),
        ),
    ]