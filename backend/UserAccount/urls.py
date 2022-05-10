from django.urls import path
from UserAccount import views

urlpatterns = [
    path('profile/', views.RetrieveAccountDetails.as_view(), name='profile/'),
    path('profile/edit/', views.EditAccountDetails.as_view(), name='profile/edit/'),
]
