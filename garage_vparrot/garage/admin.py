from typing import Any, List, Tuple, Union
from django.contrib import admin
from django.http.request import HttpRequest

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

class OpeningDays(admin.TabularInline):
    model = OpeningTime
    extra = 0
    
class Services(admin.TabularInline):
    model = Service
    extra = 0

class Pictures(admin.TabularInline):
    model = VehiclePicture
    extra = 0

class GarageAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['name', 'adress', 'postal_code', 'city', 'phone_number', 'contact_email']}),
        ]
    inlines = [OpeningDays]

class OpeningTimeAdmin(admin.ModelAdmin):
    list_display = ['day', 'opening_hours']
    ordering = ['pk']

class ServiceTypeAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['garage', 'name']}),
        ("IMAGE", {'fields': ['image']}),
    ]
    inlines = [Services]

class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name','type']
    list_filter = ['type']
    ordering = ['type']
    search_fields = ['name']
    search_help_text = 'Recherche par nom'

class VehicleAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['garage', 'name']}),
        ("CARACTERISTIQUES", {'fields': ['price', 'year', 'km']}),
    ]
    list_display = ['name', 'price', 'year', 'km']
    list_per_page = 50
    ordering = ['pk']
    search_fields = ['name']
    search_help_text = "Recherche par nom"
    inlines = [Pictures]

class VehiclePictureadmin(admin.ModelAdmin):
    list_display = ['vehicle', 'picture']
    list_display_links = ['picture']
    list_per_page = 50
    list_filter = ['vehicle']
    ordering = ['pk']
    search_fields = ['vehicle']
    search_help_text = "Recherche par véhicule"

class CustomerMessageAdmin(admin.ModelAdmin):
    list_display = ['subject', 'email', 'phone_number', 'firstname', 'lastname', 'date']
    list_per_page = 50
    list_filter = ['date','email']
    ordering = ['-date']
    search_fields = ['subject', 'firstname', 'lastname']
    search_help_text = "Recherche par sujet, nom ou prénom"
    empty_value_display = 'Non renseigné'

class CustomerReviewAdmin(admin.ModelAdmin):
    list_display = ['name', 'rating', 'message', 'verified', 'valid', 'date']
    list_per_page = 20
    list_filter = ['date', 'rating']
    ordering = ['-date']
    search_fields = ['name']
    search_help_text = "Recherche par nom"

admin.site.register(Garage, GarageAdmin)
admin.site.register(OpeningTime, OpeningTimeAdmin)
admin.site.register(ServiceType, ServiceTypeAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(VehiclePicture, VehiclePictureadmin)
admin.site.register(CustomerMessage, CustomerMessageAdmin)
admin.site.register(CustomerReview, CustomerReviewAdmin)
