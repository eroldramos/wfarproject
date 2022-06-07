from calendar import week
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import GetAllNotificationSerializer
from core.models import Faculty, Notification


# Create your views here.
class GetNotification(APIView):
    def get(self, request):
        user_id = request.GET.get('user_id')
        try:
            faculty = Faculty.objects.get(id=user_id)
            faculty_type = faculty.user_type
            notifications = []
            if(faculty.is_staff):
                notifications = Notification.objects.filter(type=6)
            elif (faculty.is_staff == False and (faculty_type == 1 or faculty_type == 2 or faculty_type == 3)):
                notifications = Notification.objects.filter(owner_id = user_id)
            serializer = GetAllNotificationSerializer(notifications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving notification. "}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         Ito po 'yung Notifications model, gumagana na po 'yung notifs para sa type 1-5.

# Nilagay ko rin po dyan sa model 'yung mga foreign keys na baka maging helpful kung gusto po nating magclickable 'yung notifications:

# owner_id = ito po 'yung makakareceive ng notif
# wfar_id = wfar po
# wfar_comment_id = ito po yung comment sa wfar
# faculty_registered_id = ito po 'yung faculty na nagregister and waiting na ma-accept

# 'yung pong notifs para sa type 6 para sa admin, area chair and department head na po yun


# class Notification(models.Model):
#     detail = models.TextField(max_length=1000)
#     type = models.PositiveSmallIntegerField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     read_at = models.DateTimeField(null=True)
#     owner_id = models.ForeignKey(
#         Faculty, related_name="faculty_owner", on_delete=models.CASCADE, null=True)
#     wfar_id = models.ForeignKey(WFAR, on_delete=models.CASCADE, null=True)
#     wfar_comment_id = models.ForeignKey(
#         WFAR_Comment, on_delete=models.CASCADE, null=True)
#     faculty_registered_id = models.ForeignKey(
#         Faculty, related_name="faculty_registered", on_delete=models.CASCADE, null=True)