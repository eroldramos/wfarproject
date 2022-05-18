from django.urls import path
from Dashboard import views

urlpatterns =[
   path('wfar-this-week/', views.GetAllWFARThisWeek.as_view(), name='wfar-this-week'),
   path('all-user-for-dashboard/', views.GetAllUserForDashboard.as_view(), name='all-user-for-dashboard'),
   path('active-semester/', views.GetActiveSemester.as_view(), name='active-semester'),
]