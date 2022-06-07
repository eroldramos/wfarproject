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
            notifications = []
            if(faculty.is_staff == True):
                notifications = Notification.objects.filter(type=6)
            else:
                notifications = Notification.objects.filter(owner_id=user_id)
            serializer = GetAllNotificationSerializer(notifications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving your notifications."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
