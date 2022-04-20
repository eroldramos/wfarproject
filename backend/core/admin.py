from django.contrib import admin
from core.models import Faculty, Semester, Week, WFAR, WFAR_Entry, WFAR_Entry_Activity, WFAR_Entry_Attachment, WFAR_Comment

# Register your models here.
admin.site.register(Faculty)
admin.site.register(Semester)
admin.site.register(Week)
admin.site.register(WFAR)
admin.site.register(WFAR_Entry)
admin.site.register(WFAR_Entry_Activity)
admin.site.register(WFAR_Entry_Attachment)
admin.site.register(WFAR_Comment)