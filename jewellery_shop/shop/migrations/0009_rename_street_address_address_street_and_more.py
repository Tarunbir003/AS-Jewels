# Generated by Django 4.2.16 on 2024-10-15 08:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_alter_order_billing_address_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='street_address',
            new_name='street',
        ),
        migrations.RemoveField(
            model_name='address',
            name='address_type',
        ),
        migrations.RemoveField(
            model_name='address',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='address',
            name='user',
        ),
    ]
