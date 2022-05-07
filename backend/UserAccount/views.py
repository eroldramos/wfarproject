from email.policy import HTTP
from re import I
from django.shortcuts import render

from core.models import Faculty
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import ProfileSerializer

class RetrieveAccountDetails(APIView):

    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            pass

        try:
            #faculty = Faculty.objects.filter(pk=self.request.session.session_key)
            faculty = Faculty.objects.filter(pk=7)
            serializer = ProfileSerializer(faculty, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)