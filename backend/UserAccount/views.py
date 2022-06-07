from asyncio.log import logger
from email.policy import HTTP
from re import I
from django.shortcuts import render
import datetime

from core.models import Faculty
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import ProfileSerializer
from core.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password, check_password


class RetrieveAccountDetails(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            faculty = Faculty.objects.filter(pk=pk)
            serializer = ProfileSerializer(faculty, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": 'error'}, status=status.HTTP_404_NOT_FOUND)


class RetrieveEmails(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            listEmails = []
            users = Faculty.objects.exclude(pk=pk)
            for user in users:
                listEmails.append(user.email)

            return Response(listEmails, status=status.HTTP_200_OK)
        except:
            return Response({"detail": 'error'}, status=status.HTTP_404_NOT_FOUND)


class EditAccountDetails(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = Faculty.objects.get(pk=pk)
        if(user.first_name == request.data['first_name']
           and user.middle_name == request.data['middle_name']
           and user.last_name == request.data['last_name']
           and user.middle_name == request.data['middle_name']
           and user.emp_no == request.data['emp_no']
           and user.civil_status == request.data['civil_status']
           and user.house_no == request.data['house_no']
           and user.street == request.data['street']
           and user.subdivision == request.data['subdivision']
           and user.barangay == request.data['barangay']
           and user.municipality == request.data['municipality']
           and user.province == request.data['province']
           and user.zip_code == request.data['zip_code']
           and user.contact_no == request.data['contact_no']
           and user.email == request.data['email']
           and user.specialization == request.data['specialization']):
            return Response({"error": "nothing edited"}, status=status.HTTP_304_NOT_MODIFIED)
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
        user.specialization = request.data['specialization']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)


class EditPassword(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = Faculty.objects.get(pk=pk)
        if(check_password(request.data['current'], user.password)):
            user.password = make_password(request.data['password'])
            user.save()
            return Response({"detail": "Edited"}, status=status.HTTP_200_OK)
        return Response({"error": "Incorrect Password"}, status=status.HTTP_304_NOT_MODIFIED)


class EditProfilePic(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = Faculty.objects.get(pk=pk)
        user.profile_picture = request.FILES['profile_picture']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)


class DeleteAccount(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = Faculty.objects.get(pk=pk)
        if(check_password(request.data['password'], user.password)):
            user.deleted_at = datetime.datetime.now()
            user.save()
            return Response({"detail": "Edited"}, status=status.HTTP_200_OK)
        return Response({"error": "Incorrect Password"}, status=status.HTTP_304_NOT_MODIFIED)


class SetSignature(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = Faculty.objects.get(pk=pk)
        user.signature = request.FILES['signature']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)


class ViewFaculty(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = Faculty.objects.get(pk=pk)
        user.view_id = request.data['view_id']
        user.save()
        return Response({"detail": "Edited"}, status=status.HTTP_200_OK)
