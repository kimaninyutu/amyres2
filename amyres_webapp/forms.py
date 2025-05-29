from django import forms
from django.contrib.auth.forms import AuthenticationForm

class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(label="Username", max_length=50)
    password = forms.CharField(label="Password", widget=forms.PasswordInput)

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'placeholder': 'Your full name'}))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': 'Your email address'}))
    subject = forms.CharField(max_length=200, required=True, widget=forms.TextInput(attrs={'placeholder': 'Subject of your message'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Write your message here', 'rows': 4}), required=True)

class ServiceRequestForm(forms.Form):
    client_name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'Your full name'}),
        label="Name"
    )
    client_email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'Your email address'}),
        label="Email"
    )
    request_details = forms.CharField(
        widget=forms.Textarea(attrs={'placeholder': 'Describe your needs', 'rows': 4}),
        label="Details"
    )
    service_name = forms.CharField(
        max_length=100,
        widget=forms.HiddenInput(),
        required=False,  # Hidden field for the service name
    )
