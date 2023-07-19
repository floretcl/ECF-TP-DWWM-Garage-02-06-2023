from django.contrib.admin.apps import AdminConfig

class GarageAdminConfig(AdminConfig):
    default_site = 'garage_vparrot.admin.GarageAdminSite'
