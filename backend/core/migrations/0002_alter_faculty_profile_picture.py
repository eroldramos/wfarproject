# Generated by Django 4.0.4 on 2022-05-07 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='faculty',
            name='profile_picture',
            field=models.ImageField(default='avatar.svg', null=True, upload_to=''),
        ),
    ]