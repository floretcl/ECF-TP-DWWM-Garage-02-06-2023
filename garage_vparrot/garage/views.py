from django.views.generic import View, TemplateView, FormView, ListView
from django.views.generic.edit import ModelFormMixin
from .models import CustomerReview
from .modelforms import ContactForm, ReviewForm

class IndexView(FormView):
    template_name = 'garage/index.html'
    form_class = ReviewForm
    success_url = '/'
            
    def form_valid(self, form):
        form.save()
        return super(IndexView, self).form_valid(form)

class VehiclesView(TemplateView):
    template_name = 'garage/vehicles.html'

class ContactView(FormView):
    template_name = 'garage/contact.html'
    form_class = ContactForm
    success_url = '/contact/'
    
    def form_valid(self, form):
        form.save()
        return super(ContactView, self).form_valid(form)

class LegalNoticeView(TemplateView):
    template_name = 'garage/legal-notice.html'

class PrivacyPolicyView(TemplateView):
    template_name = 'garage/privacy-policy.html'
