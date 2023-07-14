from django.forms import ModelForm
from .models import CustomerMessage, CustomerReview

class ContactForm(ModelForm):
    class Meta:
        model = CustomerMessage
        fields = ['firstname', 'lastname', 'email', 'phone_number', 'subject', 'message']

class ReviewForm(ModelForm):
    class Meta:
        model = CustomerReview
        fields = ['name', 'message', 'rating']
