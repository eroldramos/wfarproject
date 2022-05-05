from django.urls import path
from UserAccount import views

urlpatterns =[
   path('profile/' ,views.RetrieveAccountDetails.as_view(), name='profile/'),
]