# Generated by Django 4.2.3 on 2023-07-14 13:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garage', '0008_alter_customermessage_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customermessage',
            name='phone_number',
            field=models.CharField(max_length=30, validators=[django.core.validators.RegexValidator(message='Saisissez un numéro de téléphone valide, ex: 0123456789.', regex='^0[1-9](\\d{8})$')], verbose_name='numéro de téléphone'),
        ),
    ]