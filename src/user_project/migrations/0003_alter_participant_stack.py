# Generated by Django 4.2.3 on 2023-08-17 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_project', '0002_alter_participant_stack'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='stack',
            field=models.CharField(default='', max_length=300),
            preserve_default=False,
        ),
    ]
