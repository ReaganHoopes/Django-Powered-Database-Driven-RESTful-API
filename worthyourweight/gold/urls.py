from django.http import HttpRequest
from django.urls import path

from . import views

app_name = 'gold'
urlpatterns = [
   #/gold/
    path('', views.main, name='main'),

]