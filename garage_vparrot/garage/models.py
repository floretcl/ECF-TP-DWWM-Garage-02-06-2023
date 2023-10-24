from django.db import models
from django.contrib.auth import models as auth_models
from django.utils import timezone
from django.core import validators
from pictures import models as pictures_models


class Garage(models.Model):
    name = models.CharField("nom", max_length=50)
    address = models.CharField("adresse", max_length=255)
    postal_code = models.CharField("code postal", max_length=10)
    city = models.CharField("ville", max_length=80)
    phone_number = models.CharField(
        "numéro de téléphone",
        max_length=20,
        validators=[
            validators.RegexValidator(
                regex=r'^0[1-9](\d{8})$',
                message="Entrez un numéro de téléphone français valide, ex: 0123456789.")
        ]
    )
    contact_email = models.CharField(
        "email de contact",
        max_length=254,
        validators=[
            validators.EmailValidator(message="L'adresse email est invalide.")
        ]
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "garage"


class OpeningTime(models.Model):
    class Day(models.TextChoices):
        MONDAY = "Lun.", "Lundi"
        TUESDAY = "Mar.", "Mardi"
        WEDNESDAY = "Mer.", "Mercredi"
        THURSDAY = "Jeu.", "Jeudi"
        FRIDAY = "Ven.", "Vendredi"
        SATURDAY = "Sam.", "Samedi"
        SUNDAY = "Dim.", "Dimanche"

    day = models.CharField(
        "jour de la semaine",
        max_length=10,
        choices=Day.choices,
    )
    opening_hours = models.CharField("horaires d'ouverture", max_length=80)
    garage = models.ForeignKey(
        Garage,
        on_delete=models.PROTECT,
        default=1,
        verbose_name="garage",
    )

    def __str__(self) -> str:
        return self.day

    class Meta:
        verbose_name = "horaire"


class ServiceType(models.Model):
    name = models.CharField("nom", max_length=50)
    image = pictures_models.PictureField("image", upload_to="uploads/%Y/%m/")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "type de service"
        verbose_name_plural = "types de service"


class Service(models.Model):
    name = models.CharField("nom", max_length=80)
    type = models.ForeignKey(
        ServiceType,
        on_delete=models.PROTECT,
        related_name="service_name"
    )
    garage = models.ForeignKey(
        Garage,
        on_delete=models.PROTECT,
        default=1,
        verbose_name="garage",
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "service"


class Vehicle(models.Model):
    name = models.CharField("nom", max_length=80)
    price = models.PositiveIntegerField("prix")
    year = models.PositiveSmallIntegerField("année")
    km = models.PositiveIntegerField("kilométrage")
    garage = models.ForeignKey(
        Garage,
        on_delete=models.PROTECT,
        default=1,
        verbose_name="garage",
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "véhicule"

    def natural_key(self):
        return self.name, self.price, self.year, self.km


class VehiclePicture(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.PROTECT,
        related_name="pictures",
    )
    picture = pictures_models.PictureField("photos", upload_to="uploads/%Y/%m/")

    def __str__(self) -> str:
        return self.picture.name

    class Meta:
        verbose_name = "photo d'un véhicule"
        verbose_name_plural = "photos des véhicules"


class CustomerReview(models.Model):
    name = models.CharField("nom", max_length=50)
    message = models.TextField("message", max_length=2000)
    rating = models.PositiveSmallIntegerField(
        "note",
        validators=[
            validators.MaxValueValidator(5, message="La note maximale est 5 étoiles."),
            validators.MinValueValidator(0, message="La note minimale est 0 étoile."),
        ]
    )
    valid = models.BooleanField("valide", null=True)
    date = models.DateTimeField("date de réception", auto_now_add=True)

    validator = models.ForeignKey(
        auth_models.User,
        on_delete=models.PROTECT,
        verbose_name="modérateur",
        null=True,
        blank=True,
    )
    # verification_date = models.DateTimeField("date de modération", auto_now=True)
    garage = models.ForeignKey(
        Garage,
        on_delete=models.PROTECT,
        default=1,
        verbose_name="garage",
    )

    def __str__(self) -> str:
        local_date = timezone.localtime(self.date)
        return (
            f"Témoignage de {self.name} reçu le "
            f"{local_date.strftime('%d/%m/%Y, %H:%M:%S')}"
        )

    def list_to_display_stars(self) -> list:
        list_stars = []
        for i in range(5):
            if self.rating > i:
                list_stars.append("star")
            else:
                list_stars.append("empty")
        return list_stars

    class Meta:
        verbose_name = "témoignage client"
        verbose_name_plural = "témoignages client"


class CustomerMessage(models.Model):
    first_name = models.CharField("prénom", max_length=80)
    last_name = models.CharField("nom", max_length=80)
    email = models.EmailField(
        "email",
        max_length=254,
        validators=[
            validators.EmailValidator(message="Entrez une adresse email valide.")
        ]
    )
    phone_number = models.CharField(
        "numéro de téléphone",
        max_length=20,
        validators=[
            validators.RegexValidator(
                regex=r'^0[1-9](\d{8})$',
                message="Entrez un numéro de téléphone français valide, ex: 0123456789.")
        ]
    )
    subject = models.CharField("sujet", max_length=255, blank=True, null=True)
    message = models.TextField("message", max_length=5000)
    date = models.DateTimeField("date de réception", auto_now_add=True)
    garage = models.ForeignKey(
        Garage,
        on_delete=models.PROTECT,
        default=1,
        verbose_name="garage",
    )

    def __str__(self) -> str:
        local_date = timezone.localtime(self.date)
        return (
            f"Message de {self.first_name} {self.last_name} reçu le "
            f"{local_date.strftime('%d/%m/%Y, %H:%M:%S')}"
        )

    class Meta:
        verbose_name = "message client"
        verbose_name_plural = "messages client"
