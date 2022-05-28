from calendar import week
from datetime import datetime
from email.policy import HTTP
from multiprocessing import context
from os import stat
from random import sample
from tokenize import maybe
from urllib import response
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from yaml import serialize
from core.serializers import WfarEntryAttachmentSerializer
from core.serializers import WfarSerializer, WfarEntrySerializer, WfarArchivedEntrySerializer, WfarEntryViewSerializer, FacultyWfarSerializer
from core.permissions import IsAuthenticated, IsAdminAreaChairAndDeptHead, IsAuthenticatedAndNotAdmin
from core.models import Notification, Semester,  WFAR, WFAR_Entry, Faculty, WFAR_Entry_Attachment, WFAR_Entry_Activity
from django.core.paginator import Paginator
from django.db.models import Q
from datetime import timedelta, date
from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.
from core.SendEmail import send_email
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
                        # return Response({"detail": "vvvvvvvv"})
                        if previous_date_day != 1:
                            week_bracket[0]+=timedelta(days=8-previous_date_day)
                        
                        sample_list.append(week_bracket[0])
                        sample_list.append(week_bracket[1])
                        

                        date_today = date.today()
                        sample_list.append("date_today: " + str(date_today))
                        current_week_no = (i + 1) + last_week_no
                        

                        if date_today >= week_bracket[0] and date_today <= week_bracket[1]:
                            wfar = WFAR.objects.create(
                                        faculty_id = Faculty.objects.get(pk=faculty_id), 
                                        semester_id = Semester.objects.get(pk=semester[0].id),
                                        week_no = current_week_no
                                    )
                            wfars.append(wfar)
                            break
                        elif (last_week_no < semester_weeks) and (week_bracket[0] <= date_today):
                            wfar = WFAR.objects.create(
                                        faculty_id = Faculty.objects.get(pk=faculty_id), 
                                        semester_id = Semester.objects.get(pk=semester[0].id),
                                        week_no = current_week_no
                                    )
                            wfars.append(wfar)
                        

                    return Response({"sample_list": sample_list, "wfars: ": WfarSerializer(wfars, many=True).data, "detail": "Successfully created"}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "No WFARs to create for this semester."}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"detail": "Unable to create a WFAR, no semester yet."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"detail": "An error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

class SubmitWfar(APIView):  
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        # try:
            wfar = WFAR.objects.get(pk=pk)
            wfar.submitted_at = datetime.now()
            wfar.status = 2
            wfar.save()

            faculty = wfar.faculty_id
            faculty_assignee = faculty.assignee_id
            notification = Notification()
            notification.detail = f"{faculty.last_name}, {faculty.first_name} has submitted WFAR for week {wfar.week_no}."
            notification.type = 1
            notification.owner_id = faculty_assignee
            notification.wfar_id = wfar
            notification.save()

            subject = "Faculty submited a WFAR"
            message = f"{faculty.last_name}, {faculty.first_name} has submitted WFAR for week {wfar.week_no}."
            send_email(faculty.id, subject, message)


            return Response({"wfar": WfarSerializer(wfar).data, "detail": "The WFAR has been submitted."}, status = status.HTTP_200_OK);
        # except:
        #     return Response({"detail": "The WFAR cannot be sumitted, an error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR);


class UnsubmitWfar(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            wfar = WFAR.objects.get(pk=pk)
            wfar.submitted_at = None
            wfar.status = 1
            wfar.save()

            faculty = wfar.faculty_id
            faculty_assignee = faculty.assignee_id
            notification = Notification()
            notification.detail = f"{faculty.last_name}, {faculty.first_name} has unsubmitted WFAR for week {wfar.week_no}."
            notification.type = 2
            notification.owner_id = faculty_assignee
            notification.wfar_id = wfar
            notification.save()

            subject = "Faculty unsubmited a WFAR"
            message = f"{faculty.last_name}, {faculty.first_name} has unsubmitted WFAR for week {wfar.week_no}."
            send_email(faculty.id, subject, message)

            return Response({"wfar": WfarSerializer(wfar).data, "detail": "The WFAR has been unsubmitted."}, status = status.HTTP_200_OK);
        except:
            return Response({"detail": "The WFAR cannot be unsubmitted, an error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR);

class CreateWfarEntry(APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request, wfar_pk):
        
        try:
            data = request.data
            
            entry = WFAR_Entry.objects.create(
                wfar_id = WFAR.objects.get(pk=wfar_pk),
                accomplishment_date = data['accomplishment_date'],
                subject = data['subject'],
                course_year_section = data['course_year_section'], 
                no_of_attendees = data['no_of_attendees'],
                recording_url = data['recording_url']
            )
            
            activities = data['activities']

            for activity in activities:
                WFAR_Entry_Activity.objects.create(
                    description = activity,
                    wfar_entry_id = entry
                )

            return Response({"detail": "The WFAR entry has been added successfully.", "id": entry.id}, status=status.HTTP_200_OK);
            pass
        except:
            return Response({"detail": "The WFAR entry has not been added successfully."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR);
            pass

class UpdateWfarEntry(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        
        try:
            data = request.data

            entry = WFAR_Entry.objects.get(pk=pk);
            entry.accomplishment_date = data['accomplishment_date'];
            entry.subject = data['subject'];
            entry.course_year_section = data['course_year_section'];
            entry.no_of_attendees = data['no_of_attendees'];
            entry.recording_url = data['recording_url'];
            entry.save();
            
            activitiesToBeReplaced = WFAR_Entry_Activity.objects.filter(wfar_entry_id=pk);
            activitiesToBeReplaced.delete();

            activities = data['activities']
            for activity in activities:
                WFAR_Entry_Activity.objects.create(
                    description = activity,
                    wfar_entry_id = entry
                )

            return Response({"detail": "The WFAR entry has been updated successfully."}, status=status.HTTP_200_OK);
            pass
        except:
            return Response({"detail": "The WFAR entry has not been updated successfully."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR);
            pass
class UpdateWfarEntryAttachments(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, wfar_entry_id):
        try:
            sc_meetings = request.FILES.getlist('sc_meetings')
            sc_activities = request.FILES.getlist('sc_activities')

            attachmentsToBeReplaced = WFAR_Entry_Attachment.objects.filter(wfar_entry_id=wfar_entry_id);
            attachmentsToBeReplaced.delete();

            for file in sc_meetings:
                WFAR_Entry_Attachment.objects.create(
                    image_uri = file,
                    type = 1,
                    wfar_entry_id = WFAR_Entry.objects.get(pk=wfar_entry_id)
                )

            for file in sc_activities:
                WFAR_Entry_Attachment.objects.create(
                    image_uri = file,
                    type = 2,
                    wfar_entry_id = WFAR_Entry.objects.get(pk=wfar_entry_id)
                )

            return Response({"detail": "The WFAR entry has been updated successfully."}, status=status.HTTP_200_OK);
        except:
            return Response({"detail": "The WFAR entry has been updated however attached images were not successfully uploaded."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR);
class ArchiveWfarEntry(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            entry = WFAR_Entry.objects.get(pk=pk)
            entry.deleted_at = datetime.now()
            entry.save()
            return Response({"wfar_entry": WfarEntrySerializer(entry).data, "detail": "The WFAR entry has been archived successfully."}, status = status.HTTP_200_OK);
        except:
            return Response({"detail": "The WFAR entry cannot be archived, an error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR);

class UnarchiveWfarEntry(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            entry = WFAR_Entry.objects.get(pk=pk)
            entry.deleted_at = None
            entry.save()
            return Response({"wfar_entry": WfarEntrySerializer(entry).data, "detail": "The WFAR entry has been restored successfully."}, status = status.HTTP_200_OK);
        except:
            return Response({"detail": "The WFAR entry cannot be restored, an error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR);

class UploadWfarEntryAttachments(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, wfar_entry_id):
        try:
            sc_meetings = request.FILES.getlist('sc_meetings')
            sc_activities = request.FILES.getlist('sc_activities')

            for file in sc_meetings:
                WFAR_Entry_Attachment.objects.create(
                    image_uri = file,
                    type = 1,
                    wfar_entry_id = WFAR_Entry.objects.get(pk=wfar_entry_id)
                )

            for file in sc_activities:
                WFAR_Entry_Attachment.objects.create(
                    image_uri = file,
                    type = 2,
                    wfar_entry_id = WFAR_Entry.objects.get(pk=wfar_entry_id)
                )

            return Response({"detail": "The WFAR entry has been added successfully."}, status=status.HTTP_200_OK);
        except:
            return Response({"detail": "The WFAR entry has been added however attached images were not successfully uploaded."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR);

class RetrieveWfarEntry(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            wfar_entry = WFAR_Entry.objects.get(pk=pk)
            serializer = WfarEntryViewSerializer(wfar_entry, context={"request": request})
            return Response(serializer.data)
        except:
            pass

class GetImage(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        # try:
            wfar_entry_attachment = WFAR_Entry_Attachment.objects.get(pk=pk)
            serializer = WfarEntryAttachmentSerializer(wfar_entry_attachment, many=False)
            return Response(serializer.data)
        # except:
        #     pass
            # return Response({"test": "test"})
