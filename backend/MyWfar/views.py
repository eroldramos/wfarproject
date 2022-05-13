from datetime import datetime
from os import stat
from tokenize import maybe
from urllib import response
from django.shortcuts import render

# Create your views here.

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from yaml import serialize
from core.serializers import WfarSerializer
from core.serializers import WfarEntrySerializer
from core.permissions import IsAuthenticated
from core.models import Week
from core.models import WFAR
from core.models import WFAR_Entry
from django.core.paginator import Paginator

class FetchMyWfar(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        wfar = WFAR.objects.all()
        wfar_serializer = WfarSerializer(wfar, many=True)
        return Response(wfar_serializer.data)
