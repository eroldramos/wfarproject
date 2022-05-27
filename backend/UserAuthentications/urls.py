from django.urls import path
from UserAuthentications import views

urlpatterns =[
   path('faculty-login/', views.FacultyLogin.as_view(), name='faculty-login'),
   path('admin-login/', views.AdminLogin.as_view(), name='admin-login'),
   path('faculty-register/', views.FacultyRegister.as_view(), name='faculty-register'),
       path('forgot-password/', views.ForgotPassword.as_view(), name='forgot-password'),
     path('reset-password/<str:token>/', views.ResetPassword.as_view(), name='reset-password'),
]