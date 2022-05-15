from django.urls import path
from core import views

urlpatterns =[
   # path('add-sem/', views.AddSem.as_view() , name='add-sem'),
   # path('get-all-sems/', views.GetAllSems.as_view() , name='get-all-sem'),
   # path('get-sem-details/<str:sem_id>/', views.GetSemDetails.as_view() , name='get-sem-details'),
   # path('update-sem/<str:sem_id>/', views.UpdateSem.as_view() , name='update-sem'),
   path('create-sems/', views.CreateSem.as_view(), name="create-sems")

]