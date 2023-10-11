from django.core import serializers
from django.http import JsonResponse
from django.views.generic.list import MultipleObjectMixin
from django.contrib import messages
from .modelforms import ContactForm, VehicleContactForm, ReviewForm
from django.views.generic import (
    View,
    TemplateView,
    FormView,
    ListView,
)
from .models import (
    OpeningTime,
    Service,
    Vehicle,
    VehiclePicture,
    CustomerReview,
)


class IndexView(View):
    @staticmethod
    def get(request, *args, **kwargs):
        view = IndexListsView.as_view()
        return view(request, *args, **kwargs)

    @staticmethod
    def post(request, *args, **kwargs):
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
        opening_time = OpeningTime.objects.all()
        context["opening_time"] = opening_time
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
