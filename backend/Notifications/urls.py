from django.urls import path
from Notifications import views

urlpatterns =[
   path('notifications/', views.GetNotification.as_view(), name='notifications'),
]