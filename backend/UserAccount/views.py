from asyncio.log import logger
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
            faculty = Faculty.objects.filter(pk=4)
            serializer = ProfileSerializer(faculty, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)


class EditAccountDetails(APIView):

    def post(self, request):
        user = Faculty.objects.get(pk=4)
        user.first_name = request.data['first_name']
        user.middle_name = request.data['middle_name']
        user.last_name = request.data['last_name']
        user.emp_no = request.data['emp_no']
        user.civil_status = request.data['civil_status']
        user.house_no = request.data['house_no']
        user.street = request.data['street']
        user.subdivision = request.data['subdivision']
        user.barangay = request.data['barangay']
        user.municipality = request.data['municipality']
        user.province = request.data['province']
        user.zip_code = request.data['zip_code']
        user.contact_no = request.data['contact_no']
        user.email = request.data['email']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)


class EditPassword(APIView):

    def post(self, request):
        user = Faculty.objects.get(pk=4)
        user.password = request.data['password']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)


class EditProfilePic(APIView):
    def post(self, request):
        user = Faculty.objects.get(pk=4)
        user.profile_picture = request.FILES['profile_picture']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)
