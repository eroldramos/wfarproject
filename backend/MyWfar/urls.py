from django.urls import path
from MyWfar import views

urlpatterns =[
    path('myWfar/', views.FetchMyWfar.as_view(), name='myWfar'),
]