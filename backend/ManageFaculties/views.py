from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import ManageFacultiesAssignmentSerializer, ManageFacultiesSerializer,ManageFacultiesUnassignmentSerializer
from core.permissions import IsAdminUser, IsAdminAreaChairAndDeptHead
from core.models import Faculty
from django.db.models import Q
from datetime import datetime


class ChangeUserType(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request):
        try:
            
            faculty = Faculty.objects.get(id=request.data['id'])
            faculty.user_type = int(request.data['new_user_type'])
            faculty.save()
            
            message = "Role updated to Faculty."   
            if request.data['new_user_type']==2:
                message = "Role updated to Area Chair."
            if request.data['new_user_type']==3:
                message = "Role updated to Department Head."
            return Response({"detail": message}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RetrieveAllUnassignedFaculty(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            faculty = Faculty.objects.filter(
                Q(assignee_id = None),
                Q(is_staff = False),
            ).exclude(accepted_at__isnull=True)
            serializer = ManageFacultiesUnassignmentSerializer(faculty, many=True)
      
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllAssignedFaculty(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, pk):
        try:
            faculty = Faculty.objects.get(id=pk)
            serializer = ManageFacultiesAssignmentSerializer(faculty, many=False)
      
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveAllNormalFacultyUser(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            faculty = Faculty.objects.filter(
                # Q(accepted_at = not None),
                Q(is_staff = False),
                Q(user_type = 1)
            ).exclude(accepted_at__isnull=True)
            serializer = ManageFacultiesUnassignmentSerializer(faculty, many=True)
      
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveAllAreaChairUser(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            faculty = Faculty.objects.filter(
                # Q(accepted_at = not None),
                Q(is_staff = False),
                Q(user_type = 2)
            )
            serializer = ManageFacultiesSerializer(faculty, many=True)
      
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllDepartmentHeadUser(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        try:
            faculty = Faculty.objects.filter(
                # Q(accepted_at = not None),
                Q(is_staff = False),
                Q(user_type = 3)
            )
        
            serializer = ManageFacultiesSerializer(faculty, many=True)
      
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UnassignedFaculties(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request):
        try:
            data = request.data['unassigned_faculties']
            for id in data:
                print(id)
                faculty = Faculty.objects.get(id=id)
                faculty.assignee_id = None
                faculty.save()
            message = {"detail":"Faculty unassigned!"}
            return Response(message,status=status.HTTP_200_OK)
        except:
            message ={'detail': 'Something went wrong!'}
            return Response(message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AssignedFaculties(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request):
        try:
            assignedTo = Faculty.objects.get(id=request.data['assignee_id'])
            data = request.data['assigned_faculties']
            for id in data:
                print(id)
                faculty = Faculty.objects.get(id=id)
                faculty.assignee_id = assignedTo
                faculty.save()
            message = {"detail":"faculties assigned!"}
            return Response(message,status=status.HTTP_200_OK)
        except:
            message ={'detail': 'Something went wrong!'}
            return Response(message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
