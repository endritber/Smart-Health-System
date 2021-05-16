from django.conf.urls import url
from . import views

urlpatterns=[
     url(r'^symptoms$',views.symptomApi),
     url(r'^symptoms/([0-9]+)$',views.symptomApi)
] 
