from django.contrib import admin

from .models import (
    Garage,
    OpeningTime,
    ServiceType,
    Service,
    Vehicle,
    VehiclePicture,
    CustomerReview,
    CustomerMessage
)

admin.site.register([
    Garage,
    OpeningTime,
    ServiceType,
    Service,
    Vehicle,
    VehiclePicture,
    CustomerReview,
    CustomerMessage
])
