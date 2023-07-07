from django.db import models

class Garage(models.Model):
    name = models.CharField("nom", max_length=50, primary_key=True)
    adress = models.CharField("adresse", max_length=254)
    postal_code = models.CharField("code postal" max_length=20)
    city = models.CharField("ville", max_length=80)
    phone_number = models.CharField("numéro de téléphone", max_length=30)
    contact_email = models.CharField("email de contact", max_length=80)
    

class CustomerReview(models.Model):
    name = models.CharField("nom", max_length=20)
    message = models.TextField("message")
    rating = models.SmallIntegerField("note")
    verified = models.BooleanField("vérifié")
    valid = models.BooleanField("valide", null=True)
    date = models.DateTimeField("date d'envoi")

class CustomerMessage(models.Model):
    firstname = models.CharField("prénom", max_length=80)
    lastname = models.CharField("nom", max_length=80)
    email = models.EmailField("email", max_length=80)
    phone_number = models.CharField("numéro de téléphone", max_length=30)
    subject = models.CharField("sujet", max_length=254)
    message = models.TextField("message")
    date = models.DateTimeField("date d'envoi")
