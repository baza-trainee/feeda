# Generated by Django 4.2.3 on 2023-08-17 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_project', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='stack',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
