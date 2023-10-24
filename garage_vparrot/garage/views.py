from django.core import serializers
from django.http import JsonResponse
from django.contrib import messages
from django.forms.models import model_to_dict
from django.views.generic import (View, TemplateView, FormView, ListView)
from .modelforms import ContactForm, VehicleContactForm, ReviewForm
from .models import (OpeningTime, Service, Vehicle, VehiclePicture, CustomerReview)


class IndexView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        view = IndexTemplateView.as_view()
        return view(request, *args, **kwargs)

    @staticmethod
    def post(request, *args, **kwargs):
        view = IndexReviewFormView.as_view()
        return view(request, *args, **kwargs)


class IndexTemplateView(TemplateView):
    template_name = 'garage/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["services"] = Service.objects.all()
        context["reviews"] = CustomerReview.objects.filter(valid=True).order_by("-date")[:3]
        context["opening_time"] = OpeningTime.objects.all()
        context["form"] = ReviewForm()
        return context


class IndexReviewFormView(FormView):
    template_name = 'garage/index.html'
    form_class = ReviewForm
    success_url = '/'

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)


class VehiclesView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        view = VehiclesListView.as_view()
        return view(request, *args, **kwargs)

    @staticmethod
    def post(request, *args, **kwargs):
        view = VehicleContactFormView.as_view()
        return view(request, *args, **kwargs)


class VehiclesListView(ListView):
    template_name = 'garage/vehicles.html'
    model = Vehicle
    context_object_name = 'vehicles'
    paginate_by = 6

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["opening_time"] = OpeningTime.objects.all()
        context["vehicles_pictures"] = VehiclePicture.objects.all()
        context["form"] = VehicleContactForm()
        return context

    def get_queryset(self):
        return Vehicle.objects.order_by('id')


class VehicleContactFormView(FormView):
    template_name = 'garage/vehicles.html'
    form_class = VehicleContactForm
    success_url = '/vehicles/'
    success_message = ("Bonjour {first_name}, merci de nous avoir contactés à propos de ce véhicule. Nous revenons "
                       "vers vous au plus vite.")

    def form_valid(self, form):
        form.save()
        form.send_email()
        messages.success(self.request, self.success_message.format(first_name=form.cleaned_data.get("first_name")))
        return super().form_valid(form)


class VehiclesJsonResponse(View):

    @staticmethod
    def get(*args, **kwargs):
        vehicles = Vehicle.objects.order_by('id')
        vehicle_dict = {}
        for vehicle in vehicles:
            vehicle_dict[vehicle.id] = model_to_dict(vehicle)
            pictures = VehiclePicture.objects.filter(vehicle=vehicle)
            vehicle_dict[vehicle.id]['pictures'] = [picture.picture.url for picture in pictures]
        return JsonResponse(vehicle_dict)


class ContactView(FormView):
    template_name = 'garage/contact.html'
    form_class = ContactForm
    success_url = '/contact/'
    success_message = "Bonjour {first_name}, merci de nous avoir contactés. Nous revenons vers vous au plus vite."

    def form_valid(self, form):
        form.save()
        form.send_email()
        messages.success(self.request, self.success_message.format(first_name=form.cleaned_data.get("first_name")))
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["opening_time"] = OpeningTime.objects.all()
        return context


class LegalNoticeView(TemplateView):
    template_name = 'garage/legal-notice.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["opening_time"] = OpeningTime.objects.all()
        return context


class PrivacyPolicyView(TemplateView):
    template_name = 'garage/privacy-policy.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["opening_time"] = OpeningTime.objects.all()
        return context
