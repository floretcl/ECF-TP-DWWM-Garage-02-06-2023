from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garage', '0002_alter_vehicle_price'),
    ]

    operations = [
        migrations.DeleteModel(
            name="OpeningTime",
        ),
        migrations.CreateModel(
            name='OpeningTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.CharField(choices=[('Lun.', 'Lundi'), ('Mar.', 'Mardi'), ('Mer.', 'Mercredi'), ('Jeu.', 'Jeudi'), ('Ven.', 'Vendredi'), ('Sam.', 'Samedi'), ('Dim.', 'Dimanche')], max_length=10, verbose_name='jour de la semaine')),
                ('opening_hours', models.CharField(max_length=80, verbose_name="horaires d'ouverture")),
                ('garage', models.ForeignKey(default='Garage.objects.first()', on_delete=models.deletion.CASCADE, to='garage.garage')),
            ],
            options={
                'verbose_name': 'Horaire',
            },
        ),
    ]
