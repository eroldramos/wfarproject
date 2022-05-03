from django.urls import path
from PendingAccounts import views

urlpatterns =[
   path('retrieve-pending-faculties/', views.RetrievePendingFaculties.as_view(), name='retrieve-pending-faculties'),
   path('accept-faculty-account/', views.AcceptFacultyAccount.as_view(), name='accept-faculty-account'),
]