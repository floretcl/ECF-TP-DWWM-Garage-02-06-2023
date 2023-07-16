from typing import Any, Dict
from django.db.models.query import QuerySet
from django.http import HttpRequest, HttpResponse
from django.views.generic import View, TemplateView, FormView, ListView
from django.views.generic.list import MultipleObjectMixin
from .models import Service, CustomerReview
from .modelforms import ContactForm, ReviewForm

class IndexView(View):
    def get(self, request, *args, **kwargs):
        view = IndexReviewListView.as_view()
        return view(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        view = IndexReviewFormView.as_view()
        return view(request, *args, **kwargs)

class IndexReviewFormView(MultipleObjectMixin, FormView):
    template_name = 'garage/index.html'
    form_class = ReviewForm
    model = CustomerReview
    success_url = '/'
            
    def form_valid(self, form):
        form.save()
        return super().form_valid(form)
    
class IndexReviewListView(ListView):
    template_name = 'garage/index.html'
    model = CustomerReview
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        services = Service.objects.all()
        context["services"] = services
        context["form"] = ReviewForm()
        return context
    
    def get_queryset(self):
        return CustomerReview.objects.filter(valid=True).order_by("-date")[:3]

class VehiclesView(TemplateView):
    template_name = 'garage/vehicles.html'

class ContactView(FormView):
    template_name = 'garage/contact.html'
    form_class = ContactForm
    success_url = '/'
    
    def form_valid(self, form):
        form.save()
        return super(ContactView, self).form_valid(form)

class LegalNoticeView(TemplateView):
    template_name = 'garage/legal-notice.html'

class PrivacyPolicyView(TemplateView):
    template_name = 'garage/privacy-policy.html'
