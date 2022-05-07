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
class CreateSemester(APIView):
    permission_classes = [IsAdminUser]    
    def post(self, request):
       
        try:
            data = request.data
            semester = Semester.objects.create(
            label = data['label'],
            school_year = data['school_year'],
            )
            weeks = data['weeks']
            for i in weeks:
                week = Week.objects.create(
                semester_id = semester, 
                start_date = i['startDate'],
                end_date = i['endDate'],
                label = i['label'],
            )
          
            return Response({"detail": "Semester created!"}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllSemesters(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            semester = Semester.objects.filter(deleted_at=None).order_by('created_at')   
            p = Paginator(semester, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            semester = p.get_page(page)
            serializer = SemesterSerializerYearAndSem(semester, many=True)

            data={
            "semList": serializer.data,
            "page": int(page),
            "pages": p.num_pages,
            "first_page":1,
            "last_page": p.num_pages
            }
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class RetrieveSemesterDetails(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, sem_id):
        try:
            sem =  Semester.objects.get(id=sem_id)
            serializer = WeeksInASemesterSerializer(sem, many=False)
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
            oldWeeks = list(semester.week_set.all())
            oldWeekId = [oldWeek.id for oldWeek in oldWeeks]
            newWeeks = data['weeks']
            newWeekId = [newWeek['id'] for newWeek in newWeeks]
            semester.save()
            print(oldWeekId)
            print(newWeekId)
           
            if(len(newWeeks)==0):
                print(len(newWeeks),'---')
                for oldWeek in oldWeeks:
                    if oldWeek.id not in newWeekId:
                        deleteWeek = Week.objects.get(id=oldWeek.id)
                        print("will be deleted")
                        deleteWeek.delete()
                       
       
                newCreatedWeek= Week.objects.create(
                            semester_id = semester, 
                            start_date = datetime.strftime(datetime.now(), '%Y-%m-%d'),
                            end_date = datetime.strftime(datetime.now(), '%Y-%m-%d'),
                            label = 'Week 1',
                            )
                print(newCreatedWeek)       
                            
            else:
                for newWeek in newWeeks:
                    print('start')
                    if Week.objects.filter(id=newWeek['id']).exists():
                        
                        if newWeek['id'] in oldWeekId:
                                existedWeek =  Week.objects.get(id=newWeek['id'])
                                existedWeek.start_date = newWeek['startDate']
                                existedWeek.end_date = newWeek['endDate']
                                existedWeek.label = newWeek['label']
                                existedWeek.save()
                                print('existed',newWeek['id'] )
                            
                        for oldWeek in oldWeeks:
                            if oldWeek.id not in newWeekId:
                                deleteWeek = Week.objects.get(id=oldWeek.id)
                                print("will be deleted")
                                deleteWeek.delete()
                                            
                            else:print("do nothing")

                    else:
                            
                        newCreatedWeek= Week.objects.create(
                                semester_id = semester, 
                                start_date = newWeek['startDate'],
                                end_date = newWeek['endDate'],
                                label = newWeek['label'],
                            )
                        
                        print('new', newWeek['id'])
            return Response({"detail": "Semester updated!"}, status=status.HTTP_200_OK)
         
  
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            
# ----------------------------------------------------------------



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