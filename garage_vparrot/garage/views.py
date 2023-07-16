from typing import Any, Dict
from django.views.generic import View, TemplateView, FormView, ListView
from django.views.generic.list import MultipleObjectMixin
from .models import OpeningTime, Service, Vehicle, VehiclePicture, CustomerReview
from .modelforms import ContactForm, ReviewForm

class IndexView(View):
    def get(self, request, *args, **kwargs):
        view = IndexListsView.as_view()
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

class IndexListsView(ListView):
    template_name = 'garage/index.html'
    model = CustomerReview
    context_object_name = 'reviews'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        opening_time = OpeningTime.objects.all()
        services = Service.objects.all()
        context["opening_time"] = opening_time
        context["services"] = services
        context["form"] = ReviewForm()
        return context
    
    def get_queryset(self):
        return CustomerReview.objects.filter(valid=True).order_by("-date")[:3]

class VehiclesView(View):
    def get(self, request, *args, **kwargs):
        view = VehiclesListView.as_view()
        return view(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        view = IndexReviewFormView.as_view()
        return view(request, *args, **kwargs)
    
class VehiclesListView(ListView):
    template_name = 'garage/vehicles.html'
    model = Vehicle
    context_object_name = 'vehicles'
    paginate_by = 9
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["vehicles_pictures"] = VehiclePicture.objects.all()
        return context

class VehicleContactFormView(MultipleObjectMixin, FormView):
    template_name = 'garage/vehicles.html'
    form_class = ContactForm
    model = Vehicle
    success_url = '/vehicles/'
            
    def form_valid(self, form):
        form.save()
        return super().form_valid(form)

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
