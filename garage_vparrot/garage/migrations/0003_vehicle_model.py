# Generated by Django 4.2.6 on 2023-11-01 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garage', '0002_vehicle_brand_vehicle_energy'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='model',
            field=models.CharField(default='modèle', max_length=80, verbose_name='modèle'),
            preserve_default=False,
        ),
    ]
