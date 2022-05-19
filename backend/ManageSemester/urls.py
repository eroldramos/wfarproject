from django.urls import path
from ManageSemester import views

urlpatterns =[
   path('create-sem/', views.CreateSemester.as_view() , name='create-sem'),
   

   path('retrieve-all-sem/',views.RetrieveAllSemesters.as_view(), name='retrieve-all-sem'),
   path('retrieve-all-archived-sem/',views.RetrieveAllArchivedSemesters.as_view(), name='retrieve-all-archived-sem'),

   path('retrieve-all-sem-list/',views.RetrieveSemestersList.as_view(), name='retrieve-all-sem-list'), # ERIKA
  
   path('retrieve-sem-details/<str:sem_id>/',views.RetrieveSemesterDetails.as_view(), name='retrieve-sem-details'),
   path('archive-restore-sem/<str:pk>/',views.ArchiveRestoreSemester.as_view(), name='archive-restore-sem'),

   path('update-sem/<str:pk>/',views.UpdateSemester.as_view(), name='update-sem'),
   path('activate-sem/<str:pk>/',views.ActivateSemester.as_view(), name='update-sem'),
   path('retrieve-active-sem/',views.RetrieveActiveSemester.as_view(), name='retrieve-active-sem'),
   
   # path('delete-sem/<str:pk>/',views.DeleteSemester.as_view(), name='delete-sem'),


   # Urls with dynamic values must be below static urls to avoid bugs

   # path('create-week-in-semester/<str:sem_id>/', views.CreateWeekInSemester.as_view() , name='create-week-in-semester'),
    


   # path('update-week/<str:pk>/',views.UpdateWeek.as_view(), name='update-week'),

   # path('retrieve-sem-detail/<str:pk>/',views.RetrieveSemesterDetail.as_view(), name='retrieve-sem-detail'),
   # path('retrieve-week-detail/<str:pk>/',views.RetrieveWeekDetail.as_view(), name='retrieve-week-detail'),

 

]