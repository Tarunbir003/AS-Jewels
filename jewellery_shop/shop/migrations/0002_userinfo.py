# Generated by Django 4.2.16 on 2024-10-09 09:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phone_number', models.CharField(max_length=20)),
                ('permanent_address', models.TextField()),
                ('is_admin', models.BooleanField(default=False)),
                ('home_address', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
