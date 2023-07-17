from django.forms import ModelForm, NumberInput, TextInput
from .models import CustomerMessage, CustomerReview

class ContactForm(ModelForm):
    class Meta:
        model = CustomerMessage
        fields = ['firstname', 'lastname', 'email', 'phone_number', 'subject', 'message']

class VehicleContactForm(ModelForm):
    class Meta:
        model = CustomerMessage
        fields = ['firstname', 'lastname', 'email', 'phone_number', 'subject', 'message']
        widgets = {
            "subject": TextInput(attrs={
                'disabled': True,
            }),
        }

class ReviewForm(ModelForm):
    class Meta:
        model = CustomerReview
        fields = ['name', 'message', 'rating']
        widgets = {
            "rating": NumberInput(attrs={
                'type': 'range',
                'step': 1,
                'min': 1,
                'max': 5,
                'value': 1,
            }),
        }
