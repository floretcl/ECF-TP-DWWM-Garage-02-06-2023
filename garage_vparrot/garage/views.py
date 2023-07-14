from django.views import generic
from .modelforms import ContactForm

class IndexView(generic.View):
    template_name = 'garage/index.html'

class VehiclesView(generic.TemplateView):
    template_name = 'garage/vehicles.html'

class ContactView(generic.FormView):
    template_name = 'garage/contact.html'
    form_class = ContactForm
    success_url = '/contact/'
    
    def form_valid(self, form):
        form.save()
        return super().form_valid(form)

class LegalNoticeView(generic.TemplateView):
    template_name = 'garage/legal-notice.html'

class PrivacyPolicyView(generic.TemplateView):
    template_name = 'garage/privacy-policy.html'
