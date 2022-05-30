from django.urls import path
from WfarSubmissions import views

urlpatterns = [

path('wfar/individual/print',
         views.PrintWFARIndividualPDF.as_view(), name='printIndividual'),


    path('wfar/retrieveWfarOverview/semester=<str:semester_id>/page=<str:page_no>/sort=<str:sort>',
         views.RetrieveFacultyWFARNoSearch.as_view(), name='wfar_faculty_overview_no_search'),
    path('wfar/retrieveWfarOverview/semester=<str:semester_id>/page=<str:page_no>/sort=<str:sort>/search=<str:search>',
         views.RetrieveFacultyWFAR.as_view(), name='wfar_faculty_overview'),
    path('wfar/overview/semester=<str:semester_id>/sort=<str:sort>/print',
         views.PrintWFAROverviewPDF.as_view(), name='printFilter1'),

    path('wfar/semester=<str:semester_id>/week=<str:week_no>/wfar_status=<str:wfar_status>/page=<str:page_no>/sort=<str:sort>',
         views.RetrieveFacultyWeeklyWFARNoSearch.as_view(), name='wfar_faculty_weekly_no_search'),
    path('wfar/semester=<str:semester_id>/week=<str:week_no>/wfar_status=<str:wfar_status>/page=<str:page_no>/sort=<str:sort>/search=<str:search>',
         views.RetrieveFacultyWeeklyWFAR.as_view(), name='wfar_faculty_weekly'),

 
    
    ]
