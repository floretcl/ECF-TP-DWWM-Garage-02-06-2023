from django.db import models

class Garage(models.Model):
    name = models.CharField("nom", max_length=50, primary_key=True)
    adress = models.CharField("adresse", max_length=254)
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
    km = models.IntegerField("kilométrageé")

    def __str__(self) -> str:
        return self.name

class VehiclePicture(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    picture = models.ImageField("photos", upload_to='uploads/%Y/%m/')

    def __str__(self) -> str:
        return self.picture.name


class CustomerReview(models.Model):
    name = models.CharField("nom", max_length=20)
    message = models.TextField("message")
    rating = models.SmallIntegerField("note")
    verified = models.BooleanField("vérifié", default=False)
    valid = models.BooleanField("valide", null=True)
    date = models.DateTimeField("date d'envoi")

    def __str__(self) -> str:
        return (
            f"témoignage de {self.name} reçu le "
            f"{self.date.strftime('%d/%m/%Y, %H:%M:%S')}"
        )

class CustomerMessage(models.Model):
    firstname = models.CharField("prénom", max_length=80)
    lastname = models.CharField("nom", max_length=80)
    email = models.EmailField("email", max_length=80)
    phone_number = models.CharField("numéro de téléphone", max_length=30)
    subject = models.CharField("sujet", max_length=254)
    message = models.TextField("message")
    date = models.DateTimeField("date d'envoi")

    def __str__(self) -> str:
        return (
            f"message de {self.firstname} {self.lastname} reçu le "
            f"{self.date.strftime('%d/%m/%Y, %H:%M:%S')}"
        )
