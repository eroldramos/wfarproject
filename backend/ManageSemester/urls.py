from django.urls import path
from ManageSemester import views

urlpatterns =[
   path('create-sem/', views.CreateSemester.as_view() , name='create-sem'),
   

   path('retrieve-all-sem/',views.RetrieveAllSemesters.as_view(), name='retrieve-all-sem'),
  



   # Urls with dynamic values must be below static urls to avoid bugs

   path('create-week-in-semester/<str:sem_id>/', views.CreateWeekInSemester.as_view() , name='create-week-in-semester'),
    path('retrieve-all-week-in-sem/<str:sem_id>/',views.RetrieveAllWeeksInSemester.as_view(), name='retrieve-all-week-in-sem'),

   path('update-sem/<str:pk>/',views.UpdateSemester.as_view(), name='update-sem'),
   path('update-week/<str:pk>/',views.UpdateWeek.as_view(), name='update-week'),

   path('retrieve-sem-detail/<str:pk>/',views.RetrieveSemesterDetail.as_view(), name='retrieve-sem-detail'),
   path('retrieve-week-detail/<str:pk>/',views.RetrieveWeekDetail.as_view(), name='retrieve-week-detail'),

   path('delete-sem/<str:pk>/',views.DeleteSemester.as_view(), name='delete-sem'),
 

]