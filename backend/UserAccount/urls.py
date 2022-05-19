from django.urls import path
from UserAccount import views

urlpatterns = [
    path('profile/', views.RetrieveAccountDetails.as_view(), name='profile/'),
    path('profile/edit/', views.EditAccountDetails.as_view(), name='profile/edit'),
    path('profile/edit-picture/', views.EditProfilePic.as_view(),
         name='profile/edit-picture'),
    path('profile/edit-password/', views.EditPassword.as_view(),
         name='profile/edit-password'),
]
