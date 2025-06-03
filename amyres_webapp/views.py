import os
from django.conf import settings
from django.shortcuts import render


# static pages#

def home_view(request):
    return render(request, 'amyres_webapp/home.html')


def background_view(request):
    return render(request, 'amyres_webapp/background.html')


def about_view(request):
    return render(request, 'amyres_webapp/about.html')


def about_us_view(request):
    # New combined about us page
    return render(request, 'amyres_webapp/about_us.html')


def team_view(request):
    return render(request, 'amyres_webapp/team.html')


def news_view(request):
    return render(request, 'amyres_webapp/news.html')


def products_view(request):
    return render(request, 'amyres_webapp/products.html')


def appindev_view(request):
    return render(request, 'amyres_webapp/appindev.html')


def contact_view(request):
    return render(request, 'amyres_webapp/contact.html')


def services_view(request):
    return render(request, 'amyres_webapp/services.html')


# products page views #

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import FileResponse, HttpResponse, HttpResponseForbidden

# Dummy feature flag for development
APP_IN_DEVELOPMENT = True


def login_view(request):
    if request.method == 'POST':
        # Redirect to the "Coming Soon" page if the app is in development
        if APP_IN_DEVELOPMENT:
            return redirect('appindev')

        # Retrieve login credentials
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Redirect to the home page
        else:
            messages.error(request, 'Invalid username or password')

    # Render the login page for GET requests or failed login attempts
    return render(request, 'amyres_webapp/login.html')


def signup_view(request):
    if request.method == 'POST':
        # Redirect to "Coming Soon" page if the app is in development
        if APP_IN_DEVELOPMENT:
            return redirect('appindev')

            # Safely retrieve form data
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        # Validate passwords match
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'amyres_webapp/signup.html')

        # Check if username is already taken
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return render(request, 'amyres_webapp/signup.html')

        # Ensure username and password are provided
        if not username or not password:
            return HttpResponse("Please provide both username and password.", status=400)

        try:
            # Create the new user
            user = User.objects.create_user(username=username, password=password)
            user.save()

            # Authenticate and log in the user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Redirect to the home page after successful signup
            else:
                return HttpResponse("Authentication failed after signup.", status=400)
        except Exception as e:
            return HttpResponse(f"Error creating user: {e}", status=500)

    # Render the signup form for GET requests
    return render(request, 'amyres_webapp/signup.html')


def download_file(request):
    if request.method == 'POST' and request.user.is_authenticated:
        file_name = request.POST.get('file1')
        file_path = os.path.join('amyres_webapp/files', 'file1.zip')
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='file1')
    return HttpResponseForbidden("You are not allowed to download this file.")


# contact view #
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages


def contact_form_view(request):
    if request.method == 'POST':
        # Extract data from the form
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        if name and email and subject and message:
            try:
                # Send email to the admin (or appropriate recipient)
                send_mail(
                    subject,  # Subject of the email
                    message,  # Body of the email
                    email,  # Sender's email address
                    ['admin@example.com'],  # To email address (admin email, change to your email)
                    fail_silently=False,
                )

                # Optionally, send a confirmation email to the user
                send_mail(
                    'Thank you for your message!',
                    'We have received your message and will get back to you shortly.',
                    'no-reply@example.com',  # Sender email (change as needed)
                    [email],  # To email (user email)
                    fail_silently=False,
                )

                # Show a success message and redirect
                messages.success(request, 'Your message has been sent successfully!')
                return redirect('contactform')  # Redirect to the same form page or a thank you page
            except Exception as e:
                messages.error(request, 'There was an error sending your message. Please try again.')
        else:
            messages.error(request, 'Please fill in all required fields.')

    return render(request, 'amyres_webapp/contactform.html')


# services #

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse


def servicerequest_view(request, service_name=None):
    if request.method == "POST":
        # Process the form data
        client_name = request.POST.get('client_name')
        client_email = request.POST.get('client_email')
        request_details = request.POST.get('request_details')
        service_name = request.POST.get('service_name', 'General Inquiry')

        if client_name and client_email and request_details:
            try:
                # Example: Save data or send email
                print(f"Service request received: {client_name}, {service_name}")

                # You can add email sending logic here similar to contact form
                messages.success(request, 'Your service request has been submitted successfully!')
                return redirect('services')  # Redirect to services page
            except Exception as e:
                messages.error(request, 'There was an error submitting your request. Please try again.')
        else:
            messages.error(request, 'Please fill in all required fields.')

    context = {'service_name': service_name}
    return render(request, 'amyres_webapp/servicerequest.html', context)
