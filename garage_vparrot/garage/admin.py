from django.contrib import admin

from .models import (
    Garage,
    OpeningTime,
    Service,
    Vehicle,
    VehiclePicture,
    CustomerReview,
    CustomerMessage
)

admin.site.register([
    Garage,
    OpeningTime,
    Service,
    Vehicle,
    VehiclePicture,
    CustomerReview,
    CustomerMessage
])
