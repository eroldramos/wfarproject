from django.urls import path
from MyWfar import views

urlpatterns =[
    path('myWfar/', views.RetrieveMyWfar.as_view(), name='myWfar'),
    path('myWfar/archived/', views.RetrieveArchivedMyWfarEntries.as_view(), name='myWfar_archived'),
    path('myWfar/create/', views.CreateWfar.as_view(), name='myWfar_create'),
    path('myWfar/submit/<str:pk>/', views.SubmitWfar.as_view(), name='myWfar_submit'),
    path('myWfar/unsubmit/<str:pk>/', views.UnsubmitWfar.as_view(), name='myWfar_unsubmit'),
    path('myWfar/entry/wfar=<str:wfar_pk>/create/', views.CreateWfarEntry.as_view(), name='myWfar_create'),
    path('myWfar/entry/<str:pk>/update/', views.UpdateWfarEntry.as_view(), name='myWfar_update'),
    path('myWfar/entry/<str:wfar_entry_id>/update_attachments/', views.UpdateWfarEntryAttachments.as_view(), name='myWfar_update_attachments'),
    path('myWfar/entry/<str:wfar_entry_id>/upload_attachments/', views.UploadWfarEntryAttachments.as_view(), name='myWfar_upload_attachments'),
    path('myWfar/entry/archive/<str:pk>/', views.ArchiveWfarEntry.as_view(), name='myWfar_archive'),
    path('myWfar/entry/unarchive/<str:pk>/', views.UnarchiveWfarEntry.as_view(), name='myWfar_unarchive'),
    path('myWfar/entry/<str:pk>/', views.RetrieveWfarEntry.as_view(), name='myWfar_entry_view'),
    path('myWfar/getImage/<str:pk>/', views.GetImage.as_view(), name='myWfar_image'),
    path('myWfar/getImage/<str:pk>/', views.GetImage.as_view(), name='myWfar_image'),
    # path('myWfar/semester=<str:semester_id>/sort=<str:sort>/print',
    #      views.PrintWFAROverviewPDF.as_view(), name='printFilter1'),
]