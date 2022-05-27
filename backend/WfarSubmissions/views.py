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
from yaml import serialize
from core.serializers import WfarEntryAttachmentSerializer, WFARCheckingWFARSerializer #EROLD
from core.serializers import WfarSerializer, WfarEntrySerializer, WfarArchivedEntrySerializer, WfarEntryViewSerializer, FacultyWfarSerializer
from core.permissions import IsAuthenticated, IsAdminAreaChairAndDeptHead
from core.models import Semester, WFAR_Comment, WFAR, WFAR_Entry, Faculty, WFAR_Entry_Attachment, WFAR_Entry_Activity
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
                weeks = getWeeks(semester)

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
                weeks = getWeeks(semester)

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


def getWeeks(semester):
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
        # try:
            semester = Semester.objects.get(pk=semester_id)
            weeks = 1  # default
            if (semester != None):
                semester_id = semester.id
                weeks = getWeeks(semester)

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
                    description = f"This report shows the statuses of all the WFARs for A.Y. {semester.school_year} - {semester.label}."
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
                    fontSize=9,
                    alignment=TA_CENTER
                )

                contentStyleLeft = ParagraphStyle(
                    name='Normal',
                    fontSize=9,
                )

                data = []

                semester_no_of_weeks = semester.no_of_weeks
                col_widths = []
                col_names = []
                col_widths.append(40 * mm)
                col_names.append(
                    Paragraph(f"<b><font color='#000'>Faculty</font></b>", contentStyle))


                width = 265/semester_no_of_weeks;
                week_label = "Week "
                font_size = 7.5
                
                for i in range(semester_no_of_weeks):
                    startWeek = week_brackets[(i * 2)].strftime("%b %d")
                    endWeek = week_brackets[(i * 2) + 1].strftime("%b %d")
                    startMonth = week_brackets[(i * 2)].month
                    endMonth = week_brackets[(i * 2) + 1].month

                    if (startMonth == endMonth):
                        endWeek = week_brackets[(i * 2) + 1].strftime("%d")
                    
                    # shorten...
                    if (semester_no_of_weeks > 12):
                        font_size = 6.75

                    if (semester_no_of_weeks > 14):
                        week_label = "W"
                    

                    col_widths.append(width * mm)
                    col_names.append(
                        Paragraph(f"<b><font color='#000'>{week_label}{i+1}<br /><font size='{font_size}'>{startWeek}-{endWeek}</font></font></b>", contentStyle))

                data.append(col_names)

                counterF = 0
                for faculty in faculties:
                    newRow = []
                    middle_name = faculty.middle_name[0] + "." if faculty.middle_name != None else ""
                    newRow.append(
                        Paragraph(f"<b>{faculty.last_name}, {faculty.first_name} {middle_name}</b>", contentStyleLeft))
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

                        newRow.append(
                            getStatus(wfar_id, wfar_status, contentStyle))
                    data.append(newRow)
                    counterF += 1

                pdf = SimpleDocTemplate(
                    buff,
                    pagesize=landscape([937, 612]),
                    rightMargin=35,
                    leftMargin=35, topMargin=35, bottomMargin=70
                )

                table = Table(data, colWidths=col_widths)

                style = TableStyle([
                    ('BACKGROUND', (0, 0), (semester_no_of_weeks+1, 0),
                     colors.HexColor("#FFFFFF")),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('FONTSIZE', (0, 0), (-1, -1), 11),
                    ('TOPPADDING', (0, 0), (-1, -1), 6),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 7)
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

                # borderStyle = TableStyle([
                #     ('BOX', (0, 0), (-1, -1), .5, colors.HexColor("#333333")),
                #     ('GRID', (0, 1), (-1, -1), .5, colors.HexColor("#333333"))
                # ])

                borderStyle = TableStyle([
                    ('BOX', (0, 0), (-1, -1), .15, colors.HexColor("#AAAAAA")),
                    ('GRID', (0, 0), (-1, -1), .15, colors.HexColor("#AAAAAA"))
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
        # except:
        #     #     pass
        #     return Response({"detail": "An error has occured while printing."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def getStatus(wfar_id, status, contentStyle):
    if status == 1:
        return Paragraph(f"<font color='maroon' size='8.5'>Not submitted</font>", contentStyle)
    if status == 2:
        return Paragraph(f"<font size='8.5'>For checking</font>", contentStyle)
    if status == 3:
        return Paragraph(f"<font color='green' size='8.5'>OK</font>", contentStyle)
    if status == 4:
        if wfar_id != -1:
            # pass
            wfar_comments = WFAR_Comment.objects.filter(
                wfar_id=wfar_id).order_by('-created_at')
            if (wfar_comments):
                return Paragraph(f"{wfar_comments[0].description}", contentStyle)
        return Paragraph(f"With Revisions", contentStyle)
    if status == "":
        return ""


class PrintWFARIndividualPDF(APIView):
    def post(self, request):
        # try:
        wfar = WFAR.objects.get(pk=request.data['wfar_id'])
        if (wfar != None):

            semester = wfar.semester_id
            faculty = wfar.faculty_id
            entries = WFAR_Entry.objects.filter(wfar_id=wfar)
            week_no = wfar.week_no
            weeks = getWeeks(semester)[0]

            # return Response({"test": len(weeks), "week_no": week_no})

            week_bracket = []
            week_bracket.append(weeks[(week_no - 1) * 2])
            week_bracket.append(weeks[((week_no - 1) * 2) + 1])

            startWeek = week_bracket[0].strftime("%b %d")
            endWeek = week_bracket[1].strftime("%b %d")

            response = HttpResponse(content_type='application/pdf')
            pdf_name = "report.pdf"
            response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name

            buff = BytesIO()

            contentStyle = ParagraphStyle(
                name='Normal',
                fontSize=10,
                alignment=TA_CENTER
            )
            headingStyle = ParagraphStyle(
                name='Normal',
                fontSize=10,
                alignment=TA_CENTER
            )
            labelStyle = ParagraphStyle(
                name='Normal',
                fontSize=10,
            )
            contentStyleLeft = ParagraphStyle(
                name='Normal',
                fontSize=10,
            )

            title = Paragraph(
                f"<b>Weekly Accomplishment Report A.Y. {semester.school_year}, {semester.label}</b>", headingStyle)
            label1 = Paragraph(
                f"<b>Faculty name:</b> {faculty.first_name} {faculty.last_name}", labelStyle)
            label2 = Paragraph(
                f"<b>Department:</b> {faculty.program}", labelStyle)
            label3 = Paragraph(f"<b>College of Information and Communications Technology</b>", labelStyle)

            weekLabel1 = Paragraph(f"<b>Week {week_no}</b>", contentStyle)
            weekLabel2 = Paragraph(
                f"<b>{startWeek} - {endWeek}</b>", contentStyle)

            data = []

            col_widths = [35 * mm, 42 * mm, 35 *
                          mm, 32 * mm, 65 * mm, 68 * mm]
            col_names = []
            col_widths.append(45 * mm)
            col_names.append(
                Paragraph(f"<font color='black'><b>DATE<br />(MM/DD/YYYY)</b></font>", contentStyle))
            col_names.append(
                Paragraph(f"<font color='black'><b>SUBJECT BEING TAUGHT</b></font>", contentStyle))
            col_names.append(
                Paragraph(f"<font color='black'><b>COURSE, YEAR, & SECTION</b></font>", contentStyle))
            col_names.append(
                Paragraph(f"<font color='black'><b>NO. OF ATTENDEES</b></font>", contentStyle))
            col_names.append(Paragraph(
                f"<font color='black'><b>LINK OF TEAM MEET RECORDING</b></font>", contentStyle))
            col_names.append(
                Paragraph(f"<font color='black'><b>LEARNING ACTIVITIES</b></font>", contentStyle))

            data.append(col_names)

            data5 = []
            attachmentLabel = Paragraph(
                f"<b>Attachments</b>", contentStyle)
            data5.append([Paragraph(f"<b>Team Meet Screenshots</b>", contentStyle),
                         Paragraph(f"<b>Provided Activities</b>", contentStyle)])
            attachments_data = []

            for entry in entries:
                list = []
                accomplishment_date = entry.accomplishment_date
                subject = entry.subject
                course_year_section = entry.course_year_section
                no_of_attendees = entry.no_of_attendees
                recording_url = entry.recording_url
                activities = WFAR_Entry_Activity.objects.filter(wfar_entry_id=entry.id)
                meet_attachments = WFAR_Entry_Attachment.objects.filter(wfar_entry_id=entry.id, type=1)
                activity_attachments = WFAR_Entry_Attachment.objects.filter(wfar_entry_id=entry.id, type=2)

                date = accomplishment_date.strftime('%m/%d/%Y')
                list.append(Paragraph(f"{date}", contentStyle))
                list.append(Paragraph(f"{subject}", contentStyle))
                list.append(Paragraph(f"{course_year_section}", contentStyle))
                list.append(Paragraph(f"{no_of_attendees}", contentStyle))
                list.append(Paragraph(f"{recording_url}", contentStyle))

                text = ""
                num = 0
                for activity in activities:
                    num += 1
                    text += f"{num}. {activity.description}<br />"

                list.append(Paragraph(f"{text}", contentStyleLeft))
                data.append(list)

                date = entry.accomplishment_date.strftime('%B %d, %Y');
                data5.append([Paragraph(
                    f"<b>{entry.course_year_section} - {entry.subject} ({date})</b>")])

                meets = []
                for meet_attachment in meet_attachments:
                    meets.append(Image('static/' + meet_attachment.image_uri.url,
                                       width=3 * inch, height=2 * inch))
                    pass
                
                acts = []
                for activity_attachment in activity_attachments:
                    acts.append(Image('static/' + activity_attachment.image_uri.url,
                                      width=3 * inch, height=2 * inch))
                    pass
                
                data5.append([meets, acts])
                pass

            pdf = SimpleDocTemplate(
                buff,
                pagesize=landscape([937, 612]),
                rightMargin=70,
                leftMargin=70, topMargin=35, bottomMargin=70
            )

            table1 = Table(data, colWidths=col_widths)

            style = TableStyle([
                # ('BACKGROUND', (0, 0), (6, 0),
                #  colors.HexColor("#BE5A40")),
                ('BACKGROUND', (0, 0), (6, 0),
                 colors.white),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('FONTSIZE', (0, 0), (-1, -1), 11),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 9)
            ])
            table1.setStyle(style)

            data2 = []
            col_names = []
            col_names.append(
                Paragraph(f"<b>Prepared by: </b>", contentStyleLeft))
            col_names.append(
                Paragraph(f"<b>Recommending Approval: </b>", contentStyleLeft))
            col_names.append(
                Paragraph(f"<b>Approved by:</b>", contentStyleLeft))

            data2.append(col_names)

            if faculty.sex == 0:
                sex = "Mr."
            elif faculty.sex == 1:
                sex = "Ms."
            else:
                sex = ""

            name = sex + " " + faculty.first_name + " " + faculty.last_name

            data2.append(
                [Paragraph(f"<b>{name.upper()}</b>", contentStyleLeft),
                 Paragraph(f"<b>DR. ROSEMARIE M. BAUTISTA</b>",
                           contentStyleLeft),
                 Paragraph(f"<b>DR. KENO C. PIAD</b>", contentStyleLeft)])

            data2.append(
                [Paragraph(f"Instructor", contentStyleLeft),
                 Paragraph(f"Department Head",
                           contentStyleLeft),
                 Paragraph(f"Dean, College of Information and Communications Technology", contentStyleLeft)])
            table2 = Table(data2, colWidths=[80*mm, 88*mm, 110*mm])

            data3 = []
            data3.append([Paragraph(f"<b>Learning Outcomes: </b>", contentStyleLeft)])
            data3.append([Paragraph(
                f"    •  Provide reading materials (online links/PowerPoint present/online PDF materials, etc.)", contentStyleLeft)])
            data3.append([Paragraph(f"    •  Give online activities/assessment to the student", contentStyleLeft)])
            data3.append([Paragraph(f"    •  Conduct synchronous class using google meet", contentStyleLeft)])
            data3.append([Paragraph(f"    •  Attend online faculty meeting", contentStyleLeft)])
            data3.append([Paragraph(f"    •  Conduct online faculty monitoring (for Dept. Heads only)", contentStyleLeft)])

            table3 = Table(data3)

            
            data4 = []
            data4.append([Paragraph(f"<b>Attachments: </b>", contentStyleLeft)])
            data4.append([Paragraph(f"    1.  Screenshot during actual Synchronous Class", contentStyleLeft)])
            data4.append([Paragraph(f"    2.  Screenshot of Classwork", contentStyleLeft)])

            table4 = Table(data4)


            # data5.append(['', '', ''])
            table5 = Table(data5)

            borderStyle = TableStyle([
                ('BOX', (0, 0), (-1, -1), .25, colors.HexColor("#333333")),
                ('GRID', (0, 0), (-1, -1), .25, colors.HexColor("#333333"))
            ])

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

            table1.setStyle(borderStyle)
            table2.setStyle(borderStyle)

            # style5 = TableStyle([
            #     # ('BACKGROUND', (0, 0), (6, 0),
            #     #  colors.HexColor("#BE5A40")),
            #     ('SPAN', (0, 0), (0, 0))
            # ])
            # table5.setStyle(style5)
            table5.setStyle(borderStyle)

            elems = []
            elems.append(Image('reports/logo_header.jpg',
                               width=11 * inch, height=.85 * inch))
            elems.append(Spacer(1 * cm, 1 * cm))
            elems.append(title)
            elems.append(Spacer(.75 * cm, .75 * cm))
            elems.append(label1)
            elems.append(Spacer(.15 * cm, .15 * cm))
            elems.append(label2)
            elems.append(Spacer(.15 * cm, .15 * cm))
            elems.append(label3)
            elems.append(Spacer(.35 * cm, .35 * cm))
            elems.append(weekLabel1)
            elems.append(Spacer(.15 * cm, .15 * cm))
            elems.append(weekLabel2)
            elems.append(Spacer(.75 * cm, .75 * cm))
            elems.append(table1)
            elems.append(Spacer(.5 * cm, .5 * cm))
            elems.append(table2)
            elems.append(Spacer(1 * cm, 1 * cm))
            elems.append(table3)
            elems.append(Spacer(1 * cm, 1 * cm))
            elems.append(table4)
            elems.append(Spacer(1 * cm, 1 * cm))
            elems.append(attachmentLabel)
            elems.append(Spacer(.5 * cm, .5 * cm))
            elems.append(table5)
            # elems.append(Spacer(1 * cm, 1 * cm))

            pdf.build(elems, canvasmaker=PageNumCanvas)

            response.write(buff.getvalue())
            buff.close()
        return response





# EROLD -------


class RetrieveWFARPerUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        # try:  
            wfar = WFAR.objects.get(id=pk)
            serializer = WFARCheckingWFARSerializer(wfar, many=False)

            return Response(serializer.data, status=status.HTTP_200_OK)
        # except:
        #     return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
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







    

    


        # except:
        #     return Response({"detail": "An error has occured while printing."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
