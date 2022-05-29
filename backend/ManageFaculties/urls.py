from django.urls import path
from ManageFaculties import views

urlpatterns =[
    path('retrieve-all-normal-faculty-user/', views.RetrieveAllNormalFacultyUser.as_view(), name='retrieve-all-normal-faculty-user'),
    path('retrieve-all-area-chair-user/', views.RetrieveAllAreaChairUser.as_view(), name='retrieve-all-area-chair-user'),
    path('retrieve-all-department-head-user/', views.RetrieveAllDepartmentHeadUser.as_view(), name='retrieve-all-department-head-user'),
    path('retrieve-all-unassigned-faculty/', views.RetrieveAllUnassignedFaculty.as_view(), name='retrieve-all-unassigned-faculty'),
    path('unassigned-faculty/', views.UnassignedFaculties.as_view(), name='unassigned-faculty'),
    path('assigned-faculty/', views.AssignedFaculties.as_view(), name='assigned-faculty'),

    path('change-user-type/', views.ChangeUserType.as_view(), name='change-user-type'),
    path('retrieve-all-assigned-faculty/<str:pk>/', views.RetrieveAllAssignedFaculty.as_view(), name='retrieve-all-assigned-faculty'),
    path('retrieve-all-assigned-faculty-for-area-chair-head/<str:pk>/', views.RetrieveAllAssignedFacultyForAreaChairHead.as_view(), name='retrieve-all-assigned-faculty-for-area-chair-head'),
#     path('promote-user-to-area-chair/<str:pk>/', views.PromoteUserToAreaChair.as_view(), name='promote-user-to-area-chair'),
#     path('promote-user-to-department-head/<str:pk>/', views.PromoteUserToDepartmentHead.as_view(), name='promote-user-to-department-head'),
]