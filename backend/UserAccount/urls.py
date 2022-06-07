from django.urls import path
from UserAccount import views

urlpatterns = [
    path('profile/<str:pk>/', views.RetrieveAccountDetails.as_view(),
         name=''),
    path('profile/edit/<str:pk>/',
         views.EditAccountDetails.as_view(), name=''),
    path('profile/edit-picture/<str:pk>/', views.EditProfilePic.as_view(),
         name=''),
    path('profile/edit-password/<str:pk>/', views.EditPassword.as_view(),
         name=''),
    path('profile/upload-signature/<str:pk>/', views.SetSignature.as_view(),
         name=''),
    path('profile/delete-account/<str:pk>/', views.DeleteAccount.as_view(),
         name=''),
    path('profile/view-faculty/<str:pk>/', views.ViewFaculty.as_view(),
         name=''),
    path('profile/get-email/<str:pk>/', views.RetrieveEmails.as_view(),
         name=''),



]
