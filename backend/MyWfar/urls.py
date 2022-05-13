from django.urls import path
from MyWfar import views

urlpatterns =[
    path('myWfar/', views.RetrieveMyWfar.as_view(), name='myWfar'),
]