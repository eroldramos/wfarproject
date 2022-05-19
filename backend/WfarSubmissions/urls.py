from django.urls import path
from WfarSubmissions import views

urlpatterns = [
<<<<<<< HEAD
    path('wfar/individual/print',
         views.PrintWFARIndividualPDF.as_view(), name='printIndividual'),
=======

path('wfar/individual/print',
         views.PrintWFARIndividualPDF.as_view(), name='printIndividual'),


>>>>>>> 5ac30cb713e47229cbf1ed59bd7b913f9dc29159
    path('wfar/retrieveWfarOverview/semester=<str:semester_id>/page=<str:page_no>/sort=<str:sort>',
         views.RetrieveFacultyWFARNoSearch.as_view(), name='wfar_faculty_overview_no_search'),
    path('wfar/retrieveWfarOverview/semester=<str:semester_id>/page=<str:page_no>/sort=<str:sort>/search=<str:search>',
         views.RetrieveFacultyWFAR.as_view(), name='wfar_faculty_overview'),
    path('wfar/overview/semester=<str:semester_id>/sort=<str:sort>/print',
         views.PrintWFAROverviewPDF.as_view(), name='printFilter1'),


 
    
<<<<<<< HEAD
]
=======
    ]
>>>>>>> 5ac30cb713e47229cbf1ed59bd7b913f9dc29159
