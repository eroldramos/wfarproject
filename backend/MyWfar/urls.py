from django.urls import path
from MyWfar import views

urlpatterns =[
    path('myWfar/', views.RetrieveMyWfar.as_view(), name='myWfar'),
    path('myWfar/archived/', views.RetrieveArchivedMyWfarEntries.as_view(), name='myWfar_archived'),
    path('myWfar/create/', views.CreateWfar.as_view(), name='myWfar_create'),
]