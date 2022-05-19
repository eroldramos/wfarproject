import datetime
# Import mimetypes module
import mimetypes
# import os module
import os
from io import BytesIO


from reportlab.platypus import Image, Table, TableStyle
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm, inch
from reportlab.lib.pagesizes import letter, landscape
from ReportGeneration.views import PageNumCanvas
from django.shortcuts import render
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
from core.serializers import WfarEntryAttachmentSerializer, WFARCheckingWFARSerializer #EROLD
from core.serializers import WfarSerializer, WfarEntrySerializer, WfarArchivedEntrySerializer, WfarEntryViewSerializer, FacultyWfarSerializer
from core.permissions import IsAuthenticated, IsAdminAreaChairAndDeptHead
from core.models import Semester, WFAR_Comment, WFAR, WFAR_Entry, Faculty, WFAR_Entry_Attachment, WFAR_Entry_Activity
from django.core.paginator import Paginator
from django.db.models import Q
from datetime import timedelta, date
from django.core.exceptions import PermissionDenied
from django.core.files import File as DjangoFile
from django.db.models import Q
from django.http import (FileResponse, Http404, HttpResponse,
                         HttpResponseRedirect)
# Import HttpResponse module
from django.http.response import HttpResponse
# Import render module
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)

from reportlab.lib.enums import TA_LEFT, TA_CENTER

from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.

# --------------------------


class RetrieveFacultyWFAR(APIView):
    # permission_classes = [IsAdminAreaChairAndDeptHead]

    def post(self, request, semester_id, page_no, sort, search):

        try:

            # return Response({"test": "test"});

            if (sort == '0'):
                sort_filter1 = "last_name"
                sort_filter2 = "first_name"
            else:
                sort_filter1 = "-last_name"
                sort_filter2 = "-first_name"

            faculty_checker_id = request.data['faculty_checker_id']
            if faculty_checker_id == 0:
                faculties = Faculty.objects.filter(
                    Q(last_name__icontains=search) | Q(first_name__icontains=search)).order_by(sort_filter1, sort_filter2)
            else:
                faculties = Faculty.objects.filter(
                    Q(last_name__icontains=search) | Q(
                        first_name__icontains=search),
                    assignee_id=Faculty.objects.get(pk=faculty_checker_id)).order_by(sort_filter1, sort_filter2)

            pages = Paginator(faculties, 10)
            faculties = pages.get_page(page_no)

            semester = Semester.objects.get(pk=semester_id)
            if (semester != None):
                semester_id = semester.id
                weeks = getCurrentWeekNo(semester)

                serializer = FacultyWfarSerializer(faculties, context={
                                                   "semester_id": semester_id, "current_week_no": weeks[1] + 1}, many=True)

                data = {
                    "faculties": serializer.data,
                    "page_no": page_no,
                    "no_of_pages": pages.num_pages,
                    "first_page": 1,
                    "last_page": pages.num_pages,
                    "week_brackets": weeks[0],
                    "semester_no_of_weeks": semester.no_of_weeks,
                    "current_week_no": weeks[1] + 1
                }

                return Response(data, status=status.HTTP_200_OK)

            else:
                return Response({"detail": "That semester doesn't exist."}, status=status.HTTP_404_NOT_FOUND)
        except:
            # pass
            return Response({"detail": "An error has occured while retrieving WFARs for that semester."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveFacultyWFARNoSearch(APIView):
    # permission_classes = [IsAdminAreaChairAndDeptHead]

    def post(self, request, semester_id, page_no, sort):

        try:

            if (sort == '0'):
                sort_filter1 = "last_name"
                sort_filter2 = "first_name"
            else:
                sort_filter1 = "-last_name"
                sort_filter2 = "-first_name"

            faculty_checker_id = request.data['faculty_checker_id']
            if faculty_checker_id == 0:
                faculties = Faculty.objects.all().order_by(sort_filter1, sort_filter2)
            else:
                faculties = Faculty.objects.filter(assignee_id=Faculty.objects.get(
                    pk=faculty_checker_id)).order_by(sort_filter1, sort_filter2)

            pages = Paginator(faculties, 10)
            faculties = pages.get_page(page_no)

            semester = Semester.objects.get(pk=semester_id)
            if (semester != None):
                semester_id = semester.id
                weeks = getCurrentWeekNo(semester)

                serializer = FacultyWfarSerializer(faculties, context={
                                                   "semester_id": semester_id, "current_week_no": weeks[1] + 1}, many=True)

                data = {
                    "faculties": serializer.data,
                    "page_no": page_no,
                    "no_of_pages": pages.num_pages,
                    "first_page": 1,
                    "last_page": pages.num_pages,
                    "week_brackets": weeks[0],
                    "semester_no_of_weeks": semester.no_of_weeks,
                    "current_week_no": weeks[1] + 1
                }

                return Response(data, status=status.HTTP_200_OK)

            else:
                return Response({"detail": "That semester doesn't exist."}, status=status.HTTP_404_NOT_FOUND)
        except:
            # pass
            return Response({"detail": "An error has occured while retrieving WFARs for that semester."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def getCurrentWeekNo(semester):
    semester_weeks = semester.no_of_weeks
    semester_start_date = semester.start_date
    semester_end_date = semester.end_date

    start = semester_start_date
    week_bracket = [start, start]
    week_no = semester_weeks

    weeks = []

    for i in range(semester_weeks):

        week_bracket[1] += timedelta(days=7)
        succeeding_date_day = week_bracket[1].isoweekday()

        if week_bracket[1] > semester_end_date:
            week_bracket[1] = semester_end_date

        if succeeding_date_day != 7:
            week_bracket[1] -= timedelta(days=succeeding_date_day)

            week_bracket[0] = week_bracket[1] - timedelta(days=6)
            previous_date_day = week_bracket[0].isoweekday()  # friday - 8 - 5

        week_bracket[0] = week_bracket[1] - timedelta(days=6)
        previous_date_day = week_bracket[0].isoweekday()  # friday - 8 - 5
        if previous_date_day != 1:
            week_bracket[0] += timedelta(days=8-previous_date_day)

        date_today = date.today()

        weeks.extend(week_bracket)
        if date_today >= week_bracket[0] and date_today <= week_bracket[1]:
            week_no = i
            # break

    # return week_bracket
    return [weeks, week_no]


class PrintWFAROverviewPDF(APIView):
    def post(self, request, semester_id, sort):

        if (sort == '0'):
            sort_filter1 = "last_name"
            sort_filter2 = "first_name"
        else:
            sort_filter1 = "-last_name"
            sort_filter2 = "-first_name"

        faculty_checker_id = request.data['faculty_checker_id']
        if faculty_checker_id == 0:
            faculties = Faculty.objects.all().order_by(sort_filter1, sort_filter2)
        else:
            faculties = Faculty.objects.filter(assignee_id=Faculty.objects.get(pk=faculty_checker_id)).order_by(sort_filter1, sort_filter2)

        semester = Semester.objects.get(pk=semester_id)
        weeks = 1 #default
        if (semester != None):
            semester_id = semester.id
            weeks = getCurrentWeekNo(semester)
                    
        response = HttpResponse(content_type='application/pdf')
        pdf_name = "report.pdf"
        response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name

        buff = BytesIO()
        paragraphStyle = getSampleStyleSheet()

        data = [
            ['Faculty', 'Name', 'Category', 'Uploader', 'Date Uploaded']
        ]


        semester_no_of_weeks = semester.no_of_weeks
        col_widths = []
        lists = []
        col_widths.append(80 * mm)
        lists.append(Paragraph(f"Faculty", paragraphStyle['Normal']))
        for i in range(semester_no_of_weeks):        
            col_widths.append(40 * mm)
            lists.append(Paragraph(f"Week {i+1}", paragraphStyle['Normal']))
            
        data.append(list)

        pdf = SimpleDocTemplate(
            buff,
            pagesize=landscape([937, 612]),
            rightMargin=70,
            leftMargin=70, topMargin=50, bottomMargin=70
        )

        table = Table(data, colWidths=col_widths)

        style = TableStyle([
            ('BACKGROUND', (0, 0), (5, 0), colors.HexColor("#8761F4")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6)
        ])

        table.setStyle(style)

        rowNumber = len(data)
        for i in range(1, rowNumber):
            if i % 2 == 0:
                bc = colors.white
            else:
                bc = colors.HexColor("#DDDDDD")
            ts = TableStyle(
                [('BACKGROUND', (0, i), (-1, i), bc)]
            )
            table.setStyle(ts)

        borderStyle = TableStyle([
            ('BOX', (0, 0), (-1, -1), .5, colors.HexColor("#777777")),
            ('GRID', (0, 1), (-1, -1), .5, colors.HexColor("#777777"))
        ])

        title = "WFARs Overview"
        description = "This report shows the overview of the WFARs submitted by your faculties during this current semester."
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
        elems.append(Paragraph(description, styles['Subtitle']))
        elems.append(Spacer(.25 * cm, .25 * cm))
        elems.append(table)
        elems.append(Spacer(1 * cm, 1 * cm))

        pdf.build(elems, canvasmaker=PageNumCanvas)

        response.write(buff.getvalue())
        buff.close()

        return response





# EROLD -------


class RetrieveWFARPerUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            wfar = WFAR.objects.get(id=pk)
            serializer = WFARCheckingWFARSerializer(wfar, many=False)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
class CreateCommentToWFAR(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            faculty_id = request.user.id
            wfar_id = request.data['wfar_id']
            description = request.data['description']

            faculty = Faculty.objects.get(id=faculty_id)
            wfar = WFAR.objects.get(id=wfar_id)
            
            WFAR_Comment.objects.create(
                faculty_id = faculty,
                wfar_id = wfar,
                description = description

            )

            message = {
                "detail": "comment added!"
            }
            return Response(message, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   

class UpdateWFARStatus(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, statusVal):
        try:
            if statusVal == 3:
                wfar = WFAR.objects.get(id=request.data['wfar_id'])
                wfar.status = 3
                wfar.checked_at = datetime.now()
                wfar.faculty_checker_id = request.user
                wfar.save()
            if statusVal == 4:
                wfar = WFAR.objects.get(id=request.data['wfar_id'])
                wfar.status = 4
                wfar.checked_at = datetime.now()
                wfar.faculty_checker_id = request.user
                wfar.save()

            message = {
                "detail": "status updated!"
            }
            return Response(message, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  


class UpdateComment(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        try:    
            comment = WFAR_Comment.objects.get(id=pk)
            comment.description = request.data['description']
            comment.save()

            message = {
                "detail": "comment updated!"
            }
            return Response(message, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class DeleteComment(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, pk):
        try:    
            comment = WFAR_Comment.objects.get(id=pk)
            comment.delete()

            message = {
                "detail": "comment deleted!"
            }
            return Response(message, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    







    

    


