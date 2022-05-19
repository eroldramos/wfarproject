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
from core.models import Semester,  WFAR, WFAR_Entry, Faculty, WFAR_Entry_Attachment, WFAR_Entry_Activity
from django.core.paginator import Paginator
from django.db.models import Q
from datetime import timedelta, date

from ctypes import alignment
import datetime
from hashlib import new
# Import mimetypes module
import mimetypes
# import os module
import os
from io import BytesIO

from reportlab.platypus import Image, Table, TableStyle
from reportlab.lib.units import cm, inch
from reportlab.lib.pagesizes import letter, landscape
from ReportGeneration.views import PageNumCanvas
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.paginator import Paginator
from django.db.models import Q
from datetime import timedelta, date
from django.db.models import Q
from django.http import (FileResponse, Http404, HttpResponse,
                         HttpResponseRedirect)
# Import HttpResponse module
from django.http.response import HttpResponse
# Import render module
from django.shortcuts import get_object_or_404, render
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

from reportlab.lib.enums import TA_LEFT, TA_CENTER

from django.http import HttpResponse, HttpResponseRedirect
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
        try:
            wfar = WFAR.objects.get(pk=pk)
            wfar.submitted_at = datetime.now()
            wfar.status = 2
            wfar.save()
            return Response({"wfar": WfarSerializer(wfar).data, "detail": "The WFAR has been submitted."}, status = status.HTTP_200_OK);
        except:
            return Response({"detail": "The WFAR cannot be sumitted, an error has occured."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR);


class UnsubmitWfar(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            wfar = WFAR.objects.get(pk=pk)
            wfar.submitted_at = None
            wfar.status = 1
            wfar.save()
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


class PrintWFARIndividualPDF(APIView):
    def post(self, request):
        # try:
            wfar = WFAR.objects.get(pk=request.data['wfar_id'])
            if (wfar != None):

                semester = Semester.objects.get(pk=wfar.semester_id);
                entries = WFAR_Entry.objects.filter(wfar_id = wfar);
                title = f"Weekly Accomplishment Report A.Y. {semester.school_year}, {semester.label}"
                
                response = HttpResponse(content_type='application/pdf')
                pdf_name = "report.pdf"
                response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name

                buff = BytesIO()

                contentStyle = ParagraphStyle(
                    name='Normal',
                    fontSize=10,
                    alignment=TA_CENTER
                )

                contentStyleLeft = ParagraphStyle(
                    name='Normal',
                    fontSize=10,
                )

                data = []

                col_widths = [30 * mm, 40 * mm, 30 * mm, 30 * mm, 45 * mm, 50 * mm]
                col_names = []
                col_widths.append(45 * mm)
                col_names.append(Paragraph(f"<font color='white'>DATE</font><br />(MM/DD/YYYY)", contentStyle))
                col_names.append(Paragraph(f"<font color='white'>SUBJECT BEING TAUGHT</font>", contentStyle))
                col_names.append(Paragraph(f"<font color='white'>COURSE, YEAR, & SECTION</font>", contentStyle))
                col_names.append(Paragraph(f"<font color='white'>NO. OF ATTENDEES</font>", contentStyle))
                col_names.append(Paragraph(f"<font color='white'>LINK OF TEAM MEET RECORDING</font>", contentStyle))
                col_names.append(Paragraph(f"<font color='white'>LEARNING ACTIVITIES</font>", contentStyle))
                
                data.append(col_names)

                
                pdf = SimpleDocTemplate(
                    buff,
                    pagesize=landscape([937, 612]),
                    rightMargin=35,
                    leftMargin=35, topMargin=35, bottomMargin=35
                )

                table = Table(data, colWidths=col_widths)

                style = TableStyle([
                    ('BACKGROUND', (0, 0), (6, 0),
                     colors.HexColor("#BE5A40")),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('FONTSIZE', (0, 0), (-1, -1), 11),
                    ('TOPPADDING', (0, 0), (-1, -1), 8),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 9)
                ])

                table.setStyle(style)

                rowNumber = len(data)
                for i in range(1, rowNumber):
                    if i % 2 == 0:
                        bc = colors.white
                    else:
                        bc = colors.HexColor("#EEEEEE")
                    ts = TableStyle(
                        [('BACKGROUND', (0, i), (-1, i), bc)]
                    )
                    table.setStyle(ts)

                borderStyle = TableStyle([
                    ('BOX', (0, 0), (-1, -1), .5, colors.HexColor("#777777")),
                    ('GRID', (0, 1), (-1, -1), .5, colors.HexColor("#777777"))
                ])

                title = "WFARs Overview"
                styles = getSampleStyleSheet()
                styles.add(ParagraphStyle(name='Subtitle',
                                          fontSize=12,
                                          leading=14,
                                          spaceAfter=6,
                                          alignment=TA_CENTER,),
                           alias='subtitle')
                styles.add(ParagraphStyle(name='DefaultHeading',
                                          fontSize=18,
                                          leading=22,
                                          spaceBefore=12,
                                          spaceAfter=6,
                                          alignment=TA_CENTER,),
                           alias='dh')

                table.setStyle(borderStyle)

                elems = []
                elems.append(Image('reports/logo_header.jpg',
                                   width=11 * inch, height=.85 * inch))
                # elems.append(Spacer(.25 * cm, .25 * cm))
                elems.append(Spacer(1 * cm, 1 * cm))
                # elems.append(Paragraph(title, styles['DefaultHeading']))
                # elems.append(Paragraph(description, styles['Subtitle']))
                elems.append(Spacer(.25 * cm, .25 * cm))
                elems.append(table)
                elems.append(Spacer(1 * cm, 1 * cm))

                pdf.build(elems, canvasmaker=PageNumCanvas)

                response.write(buff.getvalue())
                buff.close()
            return response
        # except:
        #     #     pass
        #     return Response({"detail": "An error has occured while printing."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# def getStatus(wfar_id, status, contentStyle):
#     if status == 1:
#         return Paragraph(f"<font color='maroon'>Not submitted</font>", contentStyle)
#     if status == 2:
#         return Paragraph(f"For checking", contentStyle)
#     if status == 3:
#         return Paragraph(f"<font color='green'>OK</font>", contentStyle)
#     if status == 4:
#         if wfar_id != -1:
#             # pass
#             wfar_comments = WFAR_Comment.objects.filter(
#                 wfar_id=wfar_id).order_by('-created_at')
#             if (wfar_comments):
#                 return Paragraph(f"{wfar_comments[0].description}", contentStyle)
#         return Paragraph(f"With Revisions", contentStyle)
#     if status == "":
#         return ""


# def getCurrentWeekNo(semester):
#     semester_weeks = semester.no_of_weeks
#     semester_start_date = semester.start_date
#     semester_end_date = semester.end_date

#     start = semester_start_date
#     week_bracket = [start, start]
#     week_no = semester_weeks

#     weeks = []

#     for i in range(semester_weeks):

#         week_bracket[1] += timedelta(days=7)
#         succeeding_date_day = week_bracket[1].isoweekday()

#         if week_bracket[1] > semester_end_date:
#             week_bracket[1] = semester_end_date

#         if succeeding_date_day != 7:
#             week_bracket[1] -= timedelta(days=succeeding_date_day)

#             week_bracket[0] = week_bracket[1] - timedelta(days=6)
#             previous_date_day = week_bracket[0].isoweekday()  # friday - 8 - 5

#         week_bracket[0] = week_bracket[1] - timedelta(days=6)
#         previous_date_day = week_bracket[0].isoweekday()  # friday - 8 - 5
#         if previous_date_day != 1:
#             week_bracket[0] += timedelta(days=8-previous_date_day)

#         date_today = date.today()

#         weeks.extend(week_bracket)
#         if date_today >= week_bracket[0] and date_today <= week_bracket[1]:
#             week_no = i
#             # break

#     # return week_bracket
#     return [weeks, week_no]
