from datetime import datetime
from django.shortcuts import render

# Create your views here.

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.permissions import IsAuthenticated
from core.models import Week
from core.models import WFAR
from core.models import WFAR_Entry
from django.core.paginator import Paginator

class FetchWfarFacculty(APIView):
    permission_classes = [IsAuthenticated]
    
    # def post(self)

# class RetrieveAllSemesters(APIView):
#     permission_classes = [IsAdminUser]
#     def get(self, request):
#         try:
#             semester = Semester.objects.filter(deleted_at=None).order_by('created_at')   
#             p = Paginator(semester, 6)
#             page = request.GET.get('page')
#             if page == None or str(page) == "null":
#                 page = 1

#             semester = p.get_page(page)
#             serializer = SemesterSerializerYearAndSem(semester, many=True)

#             data={
#             "semList": serializer.data,
#             "page": int(page),
#             "pages": p.num_pages,
#             "first_page":1,
#             "last_page": p.num_pages
#             }
#             return Response(data, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
