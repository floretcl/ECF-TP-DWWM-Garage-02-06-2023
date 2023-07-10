from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views import generic

class IndexView(generic.TemplateView):
    template_name = 'garage/index.html'

class VehiclesView(generic.TemplateView):
    template_name = 'garage/vehicles.html'

class ContactView(generic.TemplateView):
    template_name = 'garage/contact.html'

class LegalNoticeView(generic.TemplateView):
    template_name = 'garage/legal-notice.html'

class PrivacyPolicyView(generic.TemplateView):
    template_name = 'garage/privacy-policy.html'