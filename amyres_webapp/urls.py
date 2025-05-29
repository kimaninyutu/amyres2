from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('background/', views.background_view, name='background'),
    path('about/', views.about_view, name='about'),
    path('team/', views.team_view, name='team'),
    path('news/', views.news_view, name='news'),
    path('products/', views.products_view, name='products'),
    path('appindev/', views.appindev_view, name='appindev'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('download/', views.download_file, name='download_file'),
    path('contact/', views.contact_view, name='contact'),
    path('contactform/', views.contact_form_view, name='contactform'),  # URL for Contact Form view
    path('services/', views.services_view, name='services'),
    path('servicerequest/<str:service_name>/', views.servicerequest_view, name='servicerequest'),
]