# Generated by Django 4.2.2 on 2023-06-30 09:07

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Complexity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('complexity', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Speciality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='StatusProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TemplateLatter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('letter', models.TextField()),
                ('pdf_file', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='TypeParticipant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TypeProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('comment', models.TextField(blank=True, null=True)),
                ('start_date_project', models.DateField()),
                ('end_date_project', models.DateField(blank=True, null=True)),
                ('address_site', models.URLField(blank=True, null=True)),
                ('url', models.SlugField(unique=True)),
                ('complexity', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user_project.complexity')),
                ('project_status', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user_project.statusproject')),
                ('type_project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='user_project.typeproject')),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=25)),
                ('last_name', models.CharField(max_length=25)),
                ('phone_number', models.IntegerField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('account_discord', models.CharField(max_length=25)),
                ('account_linkedin', models.CharField(max_length=150)),
                ('city', models.CharField(max_length=25)),
                ('experience', models.BooleanField(default=False)),
                ('conditions_participation', models.BooleanField(default=False)),
                ('processing_personal_data', models.BooleanField(default=False)),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='user_project.projects')),
                ('speciality', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='user_project.speciality')),
                ('type_participant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='user_project.typeparticipant')),
            ],
        ),
        migrations.CreateModel(
            name='Command',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='user_project.projects')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user_project.participant')),
            ],
        ),
    ]
