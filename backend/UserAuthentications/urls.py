from django.urls import path
from UserAuthentications import views

urlpatterns =[
   path('faculty-login/', views.FacultyLogin.as_view(), name='faculty-login')
]