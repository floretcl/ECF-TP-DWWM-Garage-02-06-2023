from django.db import models

class CustomerReview(models.Model):
    name = models.CharField("nom", max_length=20)
    message = models.TextField("message")
    rating = models.SmallIntegerField("note")
    verified = models.BooleanField("vérifié")
    valid = models.BooleanField("valide", null=True)
    date = models.DateTimeField("date")