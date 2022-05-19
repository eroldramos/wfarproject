from django.urls import path
from UserAccount import views

urlpatterns = [
    path('profile/<str:pk>/', views.RetrieveAccountDetails.as_view(),
         name='profile/<str:pk>'),
    path('profile/edit/<str:pk>/',
         views.EditAccountDetails.as_view(), name='profile/edit/<str:pk>'),
    path('profile/edit-picture/<str:pk>/', views.EditProfilePic.as_view(),
         name='profile/edit-picture/<str:pk>'),
    path('profile/edit-password/<str:pk>/', views.EditPassword.as_view(),
         name='profile/edit-password/<str:pk>'),




]
