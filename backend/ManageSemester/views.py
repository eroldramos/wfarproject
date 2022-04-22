from datetime import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.permissions import IsAdminUser
from core.models import Semester, Week
from core.serializers import (
    SemesterSerializerYearAndSem , 
    WeekSerializer,
    WeeksInASemesterSerializer)
class CreateSemester(APIView):
    permission_classes = [IsAdminUser]    
    def post(self, request):
       
        try:
            data = request.data
            semester = Semester.objects.create(
            label = data['label'],
            school_year = data['school_year'],
            )
            return Response({"detail": "Semester created!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllSemesters(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            semester = Semester.objects.all()   
            serializer = SemesterSerializerYearAndSem(semester, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
class UpdateSemester(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request, pk):
        try:
            data =  request.data
            semester = Semester.objects.get(id=pk)
            semester.label = data['label']
            semester.school_year = data['school_year']
            semester.save()
            return Response({"detail": "Semester updated!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class RetrieveSemesterDetail(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, pk):
        try:    
            semester = Semester.objects.get(id=pk)
            serializer = SemesterSerializerYearAndSem(semester, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class DeleteSemester(APIView):
    permission_classes = [IsAdminUser]
    def delete(self, request, pk):
        try:
            semester = Semester.objects.get(id=pk)
            semester.delete_at = datetime.now()
            semester.save()
            return Response({"detail": "Semester archived!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class CreateWeekInSemester(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, sem_id):
        try:
            semester = Semester.objects.get(id=sem_id)
            data = request.data
            week = Week.objects.create(
                semester_id = semester, 
                start_date = data['start_date'],
                end_date = data['end_date'],
                label = data['label'],
            )
            return Response({"detail": "Added week to this semester!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllWeeksInSemester(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, sem_id):
        try:
            sem =  Semester.objects.get(id=sem_id)
            serializer = WeeksInASemesterSerializer(sem, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

class RetrieveWeekDetail(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, pk):
        try:
            week =  Week.objects.get(id=pk)
            serializer = WeekSerializer(week, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

class UpdateWeek(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request, pk):
        try:
            data =  request.data
            weekly_report = Week.objects.get(id=pk)
            weekly_report.start_date = data['start_date']
            weekly_report.end_date = data['end_date']
            weekly_report.label = data['label']
            weekly_report.save()
            return Response({"detail": "Semester updated!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)