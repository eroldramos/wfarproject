from calendar import week
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.models import WFAR, Semester, Faculty
from core.serializers import GetAllWFAR, GetAllUser , SemesterSerializer
from core.permissions import IsAdminUser, IsAdminAreaChairAndDeptHead
import datetime

# Create your views here.
class GetAllWFARThisWeek(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):

        try:
            #get active sem
            semester = Semester.objects.filter(is_active=True) 
            semester_id = semester[0].id
             
            #get current week bracket
            current_date = datetime.date.today()
            current_week_day = datetime.datetime(current_date.year,current_date.month,current_date.day).weekday()
            start_date = current_date - datetime.timedelta(days=current_week_day)
            end_date = current_date + datetime.timedelta(days=6-current_week_day)
            

            wfar = WFAR.objects.all().filter(semester_id=semester_id,
                submitted_at__gte = datetime.datetime.combine(start_date, datetime.datetime.min.time()),
                submitted_at__lte = datetime.datetime.combine(end_date, datetime.datetime.min.time()),
            )

            serializer = GetAllWFAR(wfar, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving this week WFARs."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllUserForDashboard(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):

        try:
            users = Faculty.objects.all()
            serializer = GetAllUser(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving all users."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetActiveSemester(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):

        try:
            activeSem = Semester.objects.all().filter(is_active=True)
            serializer = SemesterSerializer(activeSem, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving active semester."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
