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
from datetime import datetime
from django.db.models import Q
from django.core.paginator import Paginator


class GetAllSems(APIView):
  def  get(self, request):
    try:
        semesters = Semester.objects.all()
        serializer = SemesterSerializerYearAndSem(semesters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

class GetSemDetails(APIView):
    def get(self, request, sem_id):
        try:
            semDetails = Semester.objects.get(id=sem_id)
            serializer = SemesterSerializerYearAndSem(semDetails, many = False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

class AddSem(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        try: 
            semester = Semester.objects.create(
                school_year = request.data['school_year'],
                label = request.data['label']
            )
            return Response({"detail": "Added sem successfully!!!!   from " + request.user.username}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

class UpdateSem(APIView):
    def get(self, request, sem_id):
        try: 
            semester = Semester.objects.get(id=sem_id)
            semester.school_year = request.data['school_year']
            semester.label = request.data['label']
            semester.save()
            return Response({"detail": "Sem Updated!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)
