from django.urls import path
from WfarSubmissions import views

urlpatterns = [
    path('wfar/retrieveWfarOverview/semester=<str:semester_id>/page=<str:page_no>/sort=<str:sort>',
         views.RetrieveFacultyWFARNoSearch.as_view(), name='wfar_faculty_overview_no_search'),
    path('wfar/retrieveWfarOverview/semester=<str:semester_id>/page=<str:page_no>/sort=<str:sort>/search=<str:search>',
         views.RetrieveFacultyWFAR.as_view(), name='wfar_faculty_overview'),
    path('wfar/overview/semester=<str:semester_id>/sort=<str:sort>/print',
         views.PrintWFAROverviewPDF.as_view(), name='printFilter1'),


     path('create-comment-to-wfar/', views.CreateCommentToWFAR.as_view(), name='create-comment-to-wfar'),
     path('update-wfar-status/<int:statusVal>/', views.UpdateWFARStatus.as_view(), name='update-status-wfar'),
 
     path('retrieve-wfar-per-user/<str:pk>/', views.RetrieveWFARPerUser.as_view(), name='retrieve-wfar-per-user'),
     path('update-comment/<str:pk>/', views.UpdateComment.as_view(), name='update-comment'),
     path('delete-comment/<str:pk>/', views.DeleteComment.as_view(), name='delete-comment'),
    
]
