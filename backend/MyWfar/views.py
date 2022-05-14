from calendar import week
from datetime import datetime
from os import stat
from random import sample
from tokenize import maybe
from urllib import response
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from yaml import serialize
from core.serializers import WfarSerializer
from core.serializers import WfarArchivedEntrySerializer
from core.permissions import IsAuthenticated
from core.models import Semester,  WFAR, WFAR_Entry, Faculty
from django.core.paginator import Paginator
from django.db.models import Q
from datetime import timedelta, date

# Create your views here.

class RetrieveMyWfar(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):

        try:
            faculty_id = request.GET.get('faculty_id')
            semester_id = request.GET.get('semester_id')

            wfar = WFAR.objects.filter(faculty_id=faculty_id, semester_id=semester_id).order_by('-week_no')
            serializer = WfarSerializer(wfar, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving your WFARs."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RetrieveArchivedMyWfarEntries(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        try:
            faculty_id = request.GET.get('faculty_id')
            semester_id = request.GET.get('semester_id')

            wfar_entry = WFAR_Entry.objects.filter(~Q(deleted_at=None), wfar_id__faculty_id=faculty_id, wfar_id__semester_id=semester_id).order_by('-deleted_at')
            serializer = WfarArchivedEntrySerializer(wfar_entry, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving your archived WFARs."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ---------------------------------------------- CRUD

class CreateWfar(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):


        try:
            # step 1 - get the faculty id
            faculty_id = request.data['faculty_id']
        
            # step 2 - get the active_semester
            semester = Semester.objects.filter(is_active=True)
            
            if semester:
                semester_weeks = semester[0].no_of_weeks
                semester_start_date = semester[0].start_date
                semester_end_date = semester[0].end_date
            
                # step 3 - get the latest latest_week_no
                last_week_no = 0;
                try:                
                    last_wfar = WFAR.objects.filter(faculty_id=faculty_id).order_by('-week_no')[0]
                    last_week_no = last_wfar.week_no
                except:
                    pass
                
                sample_list = [] # use for debugging
                wfars = [] # wfars created
                
                # step 4 - check if need pa ba nating gumawa ng wfar, depende if di pa sagad 'yung weeks
                start = semester_start_date + timedelta(days=7*last_week_no);

                # step 5 - basta nagstore lang ako trip ko lang
                week_bracket= [start, start]
                
                # step 6 - check if ayun nga di pa sagad
                if last_week_no < semester_weeks:
                    
                    # step 7 - kung di pa sagad, mag-loop tayo sa remaining weeks
                    remaining_weeks = (semester_weeks) - last_week_no
                    for i in range(remaining_weeks):

                        if last_week_no + 1 == semester_weeks:
                            week_bracket[1] = semester_end_date
                        else:
                            
                            week_bracket[1] += timedelta(days=7)
                            succeeding_date_day = week_bracket[1].isoweekday()
                            
                            if week_bracket[1] > semester_end_date:
                                week_bracket[1] = semester_end_date
                            
                            if succeeding_date_day != 7:
                                week_bracket[1]-=timedelta(days=succeeding_date_day)
    
                        week_bracket[0] = week_bracket[1] - timedelta(days=6)
                        previous_date_day = week_bracket[0].isoweekday() # friday - 8 - 5
                        # return Response({"details": "vvvvvvvv"})
                        if previous_date_day != 1:
                            week_bracket[0]+=timedelta(days=8-previous_date_day)
                        
                        sample_list.append(week_bracket[0])
                        sample_list.append(week_bracket[1])
                        

                        date_today = date.today()
                        sample_list.append("date_today: " + str(date_today))
                        current_week_no = (i + 1) + last_week_no
                        
                        # return Response({"date_today": date_today, "week_bracket[0]": week_bracket[0], "week_bracket[1]": week_bracket[1]})

                        if date_today >= week_bracket[0] and date_today <= week_bracket[1]:
                            
                            
                            wfar = WFAR.objects.create(
                                        faculty_id = Faculty.objects.get(pk=faculty_id), 
                                        semester_id = Semester.objects.get(pk=semester[0].id),
                                        week_no = current_week_no
                                    )
                            wfars.append(wfar)
                            break
                        elif (last_week_no < semester_weeks) and (week_bracket[0] <= date_today):
                            
                            # return Response({"details": "vvvvvvvvvvvvvvvvvvvvvv"})
                            wfar = WFAR.objects.create(
                                        faculty_id = Faculty.objects.get(pk=faculty_id), 
                                        semester_id = Semester.objects.get(pk=semester[0].id),
                                        week_no = current_week_no
                                    )
                            wfars.append(wfar)
                        

                    return Response({"sample_list": sample_list, "wfars: ": WfarSerializer(wfars, many=True).data, "details": "Successfully created"}, status=status.HTTP_200_OK)
                else:
                    return Response({"details": "No WFARs to create for this semester."}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"details": "Unable to create a WFAR, no semester yet."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"details": "An error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

class SubmitWfar(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            pass
        except:
            return Response({"details": "The WFAR cannot be sumitted, an error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR);
            pass