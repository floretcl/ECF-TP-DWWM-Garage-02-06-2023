from django.db import models
from django.utils import timezone
from django.core import validators

class Garage(models.Model):
    name = models.CharField("nom", max_length=50, primary_key=True)
    adress = models.CharField("adresse", max_length=255)
    postal_code = models.CharField("code postal", max_length=20)
    city = models.CharField("ville", max_length=80)
    phone_number = models.CharField("numéro de téléphone", max_length=30)
    contact_email = models.CharField("email de contact", max_length=80)

    def __str__(self) -> str:
        return self.name

class OpeningTime(models.Model):
    class Day(models.TextChoices):
        MONDAY = 'monday', "lundi"
        TUESDAY = 'tuesday', "mardi"
        WEDNESDAY = 'wednesday', "mercredi"
        THURSDAY = 'thursday', "jeudi"
        FRIDAY = 'friday', "vendredi"
        SATURDAY = 'saturday', "samedi"
        SUNDAY = 'sunday', "dimanche"

    garage = models.ForeignKey(Garage, on_delete=models.CASCADE)
    day = models.CharField(
        "jour de la semaine", 
        primary_key=True,
        max_length=10,
        choices=Day.choices,
        )
    opening_hours = models.CharField("horaires d'ouverture", max_length=80)

    def __str__(self) -> str:
        return self.day

class Service(models.Model):
    garage = models.ForeignKey(Garage, on_delete=models.CASCADE)
    type = models.CharField("type", max_length=50)
    name = models.CharField("nom", max_length=80)

    def __str__(self) -> str:
        return self.name

class Vehicle(models.Model):
    garage = models.ForeignKey(Garage, on_delete=models.CASCADE)
    name = models.CharField("nom", max_length=80)
    price = models.CharField("prix", max_length=80)
    year = models.SmallIntegerField("année")
    km = models.IntegerField("kilométrage")

    def __str__(self) -> str:
        return self.name

class VehiclePicture(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    picture = models.ImageField("photos", upload_to='uploads/%Y/%m/')

    def __str__(self) -> str:
        return self.picture.name


class CustomerReview(models.Model):
    name = models.CharField("nom", max_length=20)
    message = models.TextField("message", max_length=2000)
    rating = models.SmallIntegerField(
        "note", 
        validators=[
            validators.MaxValueValidator(5), 
            validators.MinValueValidator(1),
        ]
    )
    verified = models.BooleanField("vérifié", default=False)
    valid = models.BooleanField("valide", null=True)
    date = models.DateTimeField("date de réception", auto_now_add=True)
    # verification_date = models.DateTimeField("date de validation", auto_now=True)
    # validator = models.CharField("modérateur", max_length=50, null=True)

    def __str__(self) -> str:
        localDate = timezone.localtime(self.date)
        return (
            f"témoignage de {self.name} reçu le "
            f"{localDate.strftime('%d/%m/%Y, %H:%M:%S')}"
        )

class CustomerMessage(models.Model):
    firstname = models.CharField("prénom", max_length=80)
    lastname = models.CharField("nom", max_length=80)
    email = models.EmailField("email", max_length=80)
    phone_number = models.CharField(
        "numéro de téléphone",
        max_length=30,
        validators=[
            validators.RegexValidator(regex=r'^0[1-9](\d{8})$', message="Saisissez un numéro de téléphone valide, ex: 0123456789.")
        ]
    )
    subject = models.CharField("sujet", max_length=255)
    message = models.TextField("message", max_length=5000)
    date = models.DateTimeField("date de réception", auto_now_add=True)

    def __str__(self) -> str:
        localDate = timezone.localtime(self.date)
        return (
            f"message de {self.firstname} {self.lastname} reçu le "
            f"{localDate.strftime('%d/%m/%Y, %H:%M:%S')}"
        )
