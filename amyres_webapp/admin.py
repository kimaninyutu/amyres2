from django.contrib import admin

from django.contrib import admin
from .models import File, ContactFormSubmission, ServiceRequest

admin.site.register(File)
admin.site.register(ContactFormSubmission)
admin.site.register(ServiceRequest)
