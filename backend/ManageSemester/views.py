from datetime import datetime
from re import S
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.permissions import IsAdminUser, IsAuthenticated
from core.models import Semester, Week
from core.serializers import (
    SemesterSerializerYearAndSem,
    SemesterAllFieldsSerializer,
    WeekSerializer, SemesterSerializer,
    SemesterAllFieldsSerializer)
from datetime import datetime
from django.db.models import Q
from django.core.paginator import Paginator
from datetime import datetime


class CreateSemester(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):

        try:
            data = request.data

            start_date = datetime.strptime(data['start_date'], "%Y-%m-%d")
            end_date = datetime.strptime(data['end_date'], "%Y-%m-%d")

            start_date = datetime(
                start_date.year, start_date.month, start_date.day)
            end_date = datetime(end_date.year, end_date.month, end_date.day)

            no_of_weeks = ((abs(end_date - start_date).days) // 7)

            semester = Semester.objects.create(
                label=data['label'],
                school_year=data['school_year'],
                start_date=data['start_date'],
                end_date=data['end_date'],
                no_of_weeks=no_of_weeks+1,
            )
            print(request.data)
            print("num of weeks", no_of_weeks)

            return Response({"detail": "Semester created!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveAllSemesters(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        try:
            semester = Semester.objects.filter(
                deleted_at=None).order_by('-created_at')
            p = Paginator(semester, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            semester = p.get_page(page)
            serializer = SemesterSerializerYearAndSem(semester, many=True)

            data = {
                "semList": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page": 1,
                "last_page": p.num_pages
            }
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class RetrieveAllArchivedSemesters(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        try:
            semester = Semester.objects.all().exclude(
                deleted_at__isnull=True).order_by('-deleted_at')
            p = Paginator(semester, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            semester = p.get_page(page)
            serializer = SemesterSerializerYearAndSem(semester, many=True)

            data = {
                "semList": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page": 1,
                "last_page": p.num_pages
            }
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class RetrieveSemesterDetails(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, sem_id):
        try:
            sem = Semester.objects.get(id=sem_id)
            serializer = SemesterAllFieldsSerializer(sem, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class UpdateSemester(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk):
        try:
            data = request.data

            start_date = datetime.strptime(data['start_date'], "%Y-%m-%d")
            end_date = datetime.strptime(data['end_date'], "%Y-%m-%d")

            start_date = datetime(
                start_date.year, start_date.month, start_date.day)
            end_date = datetime(end_date.year, end_date.month, end_date.day)

            no_of_weeks = ((abs(end_date - start_date).days) // 7)

            semester = Semester.objects.get(id=pk)
            semester.label = data['label']
            semester.school_year = data['school_year']
            semester.start_date = data['start_date']
            semester.end_date = data['end_date']
            semester.no_of_weeks = no_of_weeks+1
            semester.save()

            return Response({"detail": "Semester updated!"}, status=status.HTTP_200_OK)

        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ArchiveRestoreSemester(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        try:
            print(pk)
            semester = Semester.objects.get(id=pk)
            semester.deleted_at = datetime.now()
            semester.save()
            return Response({"detail": "Semester archived!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            semester = Semester.objects.get(id=pk)
            semester.deleted_at = None
            semester.save()
            return Response({"detail": "Semester restored!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ActivateSemester(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk):
        try:

            semsToDeactivate = Semester.objects.filter(is_active=True)

            for sems in semsToDeactivate:
                print(sems.is_active)
                sem = Semester.objects.get(id=sems.id)
                sem.is_active = False
                sem.save()

            semester = Semester.objects.get(id=pk)
            semester.is_active = True
            semester.save()
            return Response({"detail": "Semester activated!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ----------------------------------------------------------------

# Erika


class RetrieveSemestersList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            semester = Semester.objects.filter(
                deleted_at=None).order_by('-created_at')
            serializer = SemesterSerializer(semester, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class RetrieveActiveSemester(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            semester = Semester.objects.filter(
                deleted_at=None, is_active=True).order_by('-created_at')
            serializer = SemesterSerializer(semester, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


# class RetrieveSemesterDetail(APIView):
#     permission_classes = [IsAdminUser]
#     def get(self, request, pk):
#         try:
#             semester = Semester.objects.get(id=pk)
#             serializer = SemesterSerializerYearAndSem(semester, many=False)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


# class CreateWeekInSemester(APIView):
#     permission_classes = [IsAdminUser]
#     def post(self, request, sem_id):
#         try:
#             semester = Semester.objects.get(id=sem_id)
#             data = request.data
#             week = Week.objects.create(
#                 semester_id = semester,
#                 start_date = data['start_date'],
#                 end_date = data['end_date'],
#                 label = data['label'],
#             )
#             return Response({"detail": "Added week to this semester!"}, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class RetrieveWeekDetail(APIView):
#     permission_classes = [IsAdminUser]
#     def get(self, request, pk):
#         try:
#             week =  Week.objects.get(id=pk)
#             serializer = WeekSerializer(week, many=False)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

# class UpdateWeek(APIView):
#     permission_classes = [IsAdminUser]
#     def put(self, request, pk):
#         try:
#             data =  request.data
#             weekly_report = Week.objects.get(id=pk)
#             weekly_report.start_date = data['start_date']
#             weekly_report.end_date = data['end_date']
#             weekly_report.label = data['label']
#             weekly_report.save()
#             return Response({"detail": "Semester updated!"}, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
