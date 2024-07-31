from django.forms import ModelForm, NumberInput, TextInput
from django.core.mail import send_mail
from .models import CustomerMessage, CustomerReview


def contact_mail(cleaned_data):
    first_name = cleaned_data.get('first_name')
    last_name = cleaned_data.get('last_name')
    phone_number = cleaned_data.get('phone_number')
    subject = cleaned_data.get('subject')
    message = cleaned_data.get('message')
    email = cleaned_data.get('email')
    send_mail(
        subject=f'Message reçu de {first_name} {last_name} - {phone_number}, sujet: {subject or "Non renseigné"}',
        message=message,
        from_email=email,
        recipient_list=['contact@garage-vparrot.clementfloret.dev'],
    )


class ContactForm(ModelForm):
    class Meta:
        model = CustomerMessage
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'subject', 'message']
        widgets = {
            'phone_number': TextInput(attrs={
                'type': 'tel',
                'pattern': '0[1-9]{1}[0-9]{8}',
                'title': 'Entrez un numéro de téléphone français valide, ex: 0123456789.',
            }),
        }

    def send_email(self):
        contact_mail(self.cleaned_data)


class VehicleContactForm(ModelForm):
    class Meta:
        model = CustomerMessage
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'subject', 'message']
        widgets = {
            'subject': TextInput(attrs={
                'readonly': True,
            }),
            'phone_number': TextInput(attrs={
                'type': 'tel',
                'pattern': '0[1-9]{1}[0-9]{8}',
                'title': 'Entrez un numéro de téléphone français valide, ex: 0123456789.',
            })
        }

    def send_email(self):
        contact_mail(self.cleaned_data)


class ReviewForm(ModelForm):
    class Meta:
        model = CustomerReview
        fields = ['name', 'message', 'rating']
        widgets = {
            'rating': NumberInput(attrs={
                'type': 'range',
                'step': 1,
                'min': 0,
                'max': 5,
                'value': 1,
            }),
        }
