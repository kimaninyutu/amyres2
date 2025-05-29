from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Extend the default User model if necessary
class User(AbstractUser):
    # Override groups field to avoid reverse accessor conflicts
    groups = models.ManyToManyField(
        Group,
        related_name='amyres_webapp_user_set',  # Change related_name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    
    # Override user_permissions field to avoid reverse accessor conflicts
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='amyres_webapp_user_permissions_set',  # Change related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

# Model for storing files for download
class File(models.Model):
    name = models.CharField(max_length=255)  # File name
    path = models.FileField(upload_to='files/')  # File path stored in 'files/' directory

    def __str__(self):
        return self.name

# Model for contact form submissions
class ContactFormSubmission(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of submission

    def __str__(self):
        return f"{self.name} - {self.subject}"

# Model for service requests
class ServiceRequest(models.Model):
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField()
    service_name = models.CharField(max_length=255, default="General Inquiry")
    request_details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of request

    def __str__(self):
        return f"{self.client_name} - {self.service_name}"

