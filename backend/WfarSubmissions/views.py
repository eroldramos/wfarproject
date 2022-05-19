from ctypes import alignment
import datetime
from hashlib import new
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
from core.serializers import WfarEntryAttachmentSerializer
from core.serializers import WfarSerializer, WfarEntrySerializer, WfarArchivedEntrySerializer, WfarEntryViewSerializer, FacultyWfarSerializer
from core.permissions import IsAuthenticated, IsAdminAreaChairAndDeptHead
from core.models import Semester,  WFAR, WFAR_Comment, WFAR_Entry, Faculty, WFAR_Entry_Attachment, WFAR_Entry_Activity
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
            if faculty_checker_id == '0':
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
            if faculty_checker_id == '0':
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
        try:
            semester = Semester.objects.get(pk=semester_id)
            weeks = 1  # default
            if (semester != None):
                semester_id = semester.id
                weeks = getCurrentWeekNo(semester)

                week_brackets = weeks[0]
                current_week = weeks[1]

                if (sort == '0'):
                    sort_filter1 = "last_name"
                    sort_filter2 = "first_name"
                else:
                    sort_filter1 = "-last_name"
                    sort_filter2 = "-first_name"

                faculty_checker_id = request.data['faculty_checker_id']
                if faculty_checker_id == '0':
                    faculties = Faculty.objects.all().order_by(sort_filter1, sort_filter2)
                    description = f"This report shows the statuses of all the WFARs for S.Y. {semester.school_year} - {semester.label}."
                else:
                    facultyChecker = Faculty.objects.get(pk=faculty_checker_id)
                    role = ""
                    if facultyChecker.user_type == 2:
                        role = "Department Head"
                    elif facultyChecker.user_type == 3:
                        role = "Area Chair"

                    faculties = Faculty.objects.filter(
                        assignee_id=facultyChecker).order_by(sort_filter1, sort_filter2)
                    description = f"This report shows the statuses of the WFARs submitted by the faculties assigned to {role} {facultyChecker.first_name} {facultyChecker.last_name} for S.Y. {semester.school_year} - {semester.label}."

                response = HttpResponse(content_type='application/pdf')
                pdf_name = "report.pdf"
                response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name

                buff = BytesIO()

                # paragraphStyle = getSampleStyleSheet()
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

                semester_no_of_weeks = semester.no_of_weeks
                col_widths = []
                col_names = []
                col_widths.append(45 * mm)
                col_names.append(
                    Paragraph(f"<font color='white'>Faculty</font>", contentStyle))
                for i in range(semester_no_of_weeks):
                    startWeek = week_brackets[(i * 2)].strftime("%b %d")
                    endWeek = week_brackets[(i * 2) + 1].strftime("%b %d")
                    col_widths.append(28 * mm)
                    col_names.append(
                        Paragraph(f"<font color='white'>Week{i+1}<br /><font size='8'>{startWeek} - {endWeek}</font></font>", contentStyle))

                data.append(col_names)

                counterF = 0
                for faculty in faculties:
                    newRow = []
                    newRow.append(
                        Paragraph(f"{faculty.last_name}, {faculty.first_name}", contentStyleLeft))
                    for i in range(semester_no_of_weeks):

                        wfar_status = ""
                        wfar_id = -1

                        if i < len(faculty.wfars.all()) and i < (current_week + 1):
                            wfar = faculty.wfars.all()[i]
                            wfar_status = wfar.status
                            wfar_id = wfar.id
                        else:
                            if i < (current_week + 1):
                                wfar_status = 1
                            else:
                                wfar_status = ""

                        newRow.append(getStatus(wfar_id, wfar_status, contentStyle))
                    data.append(newRow)
                    counterF += 1

                pdf = SimpleDocTemplate(
                    buff,
                    pagesize=landscape([937, 612]),
                    rightMargin=35,
                    leftMargin=35, topMargin=35, bottomMargin=35
                )

                table = Table(data, colWidths=col_widths)

                style = TableStyle([
                    ('BACKGROUND', (0, 0), (semester_no_of_weeks+1, 0),
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
                elems.append(Paragraph(description, styles['Subtitle']))
                elems.append(Spacer(.25 * cm, .25 * cm))
                elems.append(table)
                elems.append(Spacer(1 * cm, 1 * cm))

                pdf.build(elems, canvasmaker=PageNumCanvas)

                response.write(buff.getvalue())
                buff.close()            
            return response
        except:
        #     pass
            return Response({"detail": "An error has occured while printing."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def getStatus(wfar_id, status, contentStyle):
    if status == 1:
        return Paragraph(f"<font color='maroon'>Not submitted</font>", contentStyle)
    if status == 2:
        return Paragraph(f"For checking", contentStyle)
    if status == 3:
        return Paragraph(f"<font color='green'>OK</font>", contentStyle)
    if status == 4:
        if wfar_id != -1:
            # pass
            wfar_comments = WFAR_Comment.objects.filter(wfar_id=wfar_id).order_by('-created_at')
            if (wfar_comments):
                return Paragraph(f"{wfar_comments[0].description}", contentStyle)
        return Paragraph(f"With Revisions", contentStyle)
    if status == "":
        return ""
