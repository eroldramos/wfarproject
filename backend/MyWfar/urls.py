from django.urls import path
from MyWfar import views

urlpatterns =[
    path('myWfar/', views.RetrieveMyWfar.as_view(), name='myWfar'),
    path('myWfar/archived/', views.RetrieveArchivedMyWfarEntries.as_view(), name='myWfar_archived'),
    path('myWfar/create/', views.CreateWfar.as_view(), name='myWfar_create'),
    path('myWfar/submit/<str:pk>/', views.SubmitWfar.as_view(), name='myWfar_submit'),
    path('myWfar/unsubmit/<str:pk>/', views.UnsubmitWfar.as_view(), name='myWfar_unsubmit'),
    path('myWfar/entry/wfar=<str:wfar_pk>/create/', views.CreateWfar.as_view(), name='myWfar_create'),
    path('myWfar/entry/archive/<str:pk>/', views.ArchiveWfarEntry.as_view(), name='myWfar_archive'),
    path('myWfar/entry/unarchive/<str:pk>/', views.UnarchiveWfarEntry.as_view(), name='myWfar_unarchive'),
]