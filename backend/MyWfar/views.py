from datetime import datetime
from os import stat
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
from core.models import Week
from core.models import WFAR
from core.models import WFAR_Entry
from django.core.paginator import Paginator
from django.db.models import Q

# Create your views here.

class RetrieveMyWfar(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):

        try:
            faculty_id = request.GET.get('faculty_id')
            semester_id = request.GET.get('semester_id')

            wfar = WFAR.objects.filter(faculty_id=faculty_id, semester_id=semester_id)
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

            wfar_entry = WFAR_Entry.objects.filter(~Q(deleted_at=None), wfar_id__faculty_id=faculty_id, wfar_id__semester_id=semester_id)
            serializer = WfarArchivedEntrySerializer(wfar_entry, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "An error has occured while retrieving your archived WFARs."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)