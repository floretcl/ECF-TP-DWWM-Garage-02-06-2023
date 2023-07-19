from typing import Any, Dict
from django.core import serializers
from django.db.models.query import QuerySet
from django.http import HttpResponse, JsonResponse
from django.views.generic.list import MultipleObjectMixin
from .modelforms import ContactForm, VehicleContactForm, ReviewForm
from django.views.generic import (
    View,
    TemplateView,
    FormView,
    ListView
)
from .models import (
    OpeningTime,
    Service,
    Vehicle,
    VehiclePicture,
    CustomerReview
)


class IndexView(View):
    def get(self, request, *args, **kwargs):
        view = IndexListsView.as_view()
        return view(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        view = IndexReviewFormView.as_view()
        return view(request, *args, **kwargs)
    
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

class IndexReviewFormView(MultipleObjectMixin, FormView):
    template_name = 'garage/index.html'
    form_class = ReviewForm
    model = CustomerReview
    success_url = '/'
            
    def form_valid(self, form):
        form.save()
        return super().form_valid(form)


class VehiclesView(View):
    def get(self, request, *args, **kwargs):
        view = VehiclesListView.as_view()
        return view(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        view = VehicleContactFormView.as_view()
        return view(request, *args, **kwargs)
    
class VehiclesListView(ListView):
    template_name = 'garage/vehicles.html'
    model = Vehicle
    context_object_name = 'vehicles'
    paginate_by = 6
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        opening_time = OpeningTime.objects.all()
        context["opening_time"] = opening_time
        context["vehicles_pictures"] = VehiclePicture.objects.all()
        context["form"] = VehicleContactForm()
        return context
    
    def get_queryset(self):
        return Vehicle.objects.order_by('id')

class VehicleListJsonResponse(ListView):
    model = Vehicle
    context_object_name = 'vehicle-list'
    
    def get(self, request, *args, **kwargs):
        vehicle_list = self.get_queryset()
        data = serializers.serialize('json', vehicle_list)
        return JsonResponse(data, safe=False)
    
    def get_queryset(self):
        return Vehicle.objects.order_by('id')

class VehiclePicturesJsonResponse(ListView):
    model = VehiclePicture
    context_object_name = 'vehicle-picture-list'
    
    def get(self, request, *args, **kwargs):
        vehicle_picture_list = self.get_queryset()
        data = serializers.serialize('json', vehicle_picture_list)
        return JsonResponse(data, safe=False)
    
    def get_queryset(self):
        return VehiclePicture.objects.order_by('vehicle')

class VehicleContactFormView(MultipleObjectMixin, FormView):
    template_name = 'garage/vehicles.html'
    form_class = VehicleContactForm
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
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["opening_time"] = OpeningTime.objects.all()
        return context

class LegalNoticeView(TemplateView):
    template_name = 'garage/legal-notice.html'

class PrivacyPolicyView(TemplateView):
    template_name = 'garage/privacy-policy.html'
