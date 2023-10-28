from django.http import JsonResponse
from django.core.paginator import Paginator
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
    ordering = 'id'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["opening_time"] = OpeningTime.objects.all()
        context["vehicles_pictures"] = VehiclePicture.objects.all()
        context["form"] = VehicleContactForm()
        return context


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
    paginate_by = 6
    ordering = 'id'

    def get(self, request, *args, **kwargs):
        # GET REQUEST PARAMS
        page = self.request.GET.get('page')
        sort_by = self.request.GET.get('sort_by')
        price_min = self.request.GET.get('price_min')
        price_max = self.request.GET.get('price_max')
        year_min = self.request.GET.get('year_min')
        year_max = self.request.GET.get('year_max')
        km_min = self.request.GET.get('km_min')
        km_max = self.request.GET.get('km_max')

        # GET ALL VEHICLES
        vehicles = Vehicle.objects.all()

        # FILTERING VEHICLES
        if price_min:
            vehicles = vehicles.filter(price__gte=price_min)
        if price_max:
            vehicles = vehicles.filter(price__lte=price_max)
        if year_min:
            vehicles = vehicles.filter(year__gte=year_min)
        if year_max:
            vehicles = vehicles.filter(year__lte=year_max)
        if km_min:
            vehicles = vehicles.filter(km__gte=km_min)
        if km_max:
            vehicles = vehicles.filter(km__lte=km_max)

        # SORTING VEHICLES
        if sort_by:
            vehicles = vehicles.order_by(sort_by)
        else:
            vehicles = vehicles.order_by(self.ordering)

        # PAGINATION OF VEHICLES
        if page:
            num_page = page
        else:
            num_page = 1
        paginator = Paginator(vehicles, self.paginate_by)
        page_obj = paginator.get_page(num_page)

        # CREATE DICT OF VEHICLES
        vehicles_obj = page_obj
        vehicle_dict = {}
        for vehicle in vehicles_obj:
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
