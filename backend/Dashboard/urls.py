from django.urls import path
from Dashboard import views

urlpatterns =[
   path('wfar-this-week/', views.GetAllWFARThisWeek.as_view(), name='wfar-this-week'),
   path('wfar-whole-sem/', views.GetAllWFARWholeSem.as_view(), name='wfar-whole-sem'),
   path('wfar-comments/', views.GetAllCommentsByID.as_view(), name='wfar-comments'),
   path('all-user-for-dashboard/', views.GetAllUserForDashboard.as_view(), name='all-user-for-dashboard'),
   path('active-semester/', views.GetActiveSemester.as_view(), name='active-semester'),
]