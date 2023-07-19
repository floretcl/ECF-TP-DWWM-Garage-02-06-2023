from django.urls import path

from . import views

app_name = "garage"
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('vehicles/', views.VehiclesView.as_view(), name='vehicles'),
    path('vehicles-list/', views.VehicleListJsonResponse.as_view(), name='vehicles-json'),
    path('vehicles-pics/', views.VehiclePicturesJsonResponse.as_view(), name='vehicles-pics-json'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('legal-notice/', views.LegalNoticeView.as_view(), name='legal-notice'),
    path('privacy-policy/', views.PrivacyPolicyView.as_view(), name='privacy-policy'),
]
