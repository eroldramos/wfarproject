from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import (ManageFacultiesAssignmentSerializer, 
ManageFacultiesSerializer,
ManageFacultiesUnassignmentSerializer,
FacultySerializer
)
from core.permissions import IsAdminUser, IsAdminAreaChairAndDeptHead, IsAuthenticated
from core.models import Faculty, Notification
from django.db.models import Q
from datetime import datetime
from django.core.paginator import Paginator
from core.SendEmail import send_email
class ChangeUserType(APIView):
    permission_classes = [IsAdminUser]
    def put(self, request):
        try:
            
            faculty = Faculty.objects.get(id=request.data['id'])
            faculty_prev_user_type = faculty.user_type
            faculty.user_type = int(request.data['new_user_type'])
            faculty.save()
            
            message = "Role updated to normal Faculty."  
            detail = "You have been demoted to a normal Faculty position."
            notif_type = 8

            subject = "Demoted to a normal Faculty position"

            if request.data['new_user_type']==1:
                assignedFaculties = faculty.faculty_set.all()
                for faculty in assignedFaculties:
                    print(faculty.id)
                    facultyUnassigned = Faculty.objects.get(id=faculty.id)
                    facultyUnassigned.assignee_id = None
                    facultyUnassigned.save()



            if request.data['new_user_type']==2:
                message = "Role updated to Area Chair."
                if faculty_prev_user_type == 3:
                    detail = "You have been demoted to an Area Chair position."
                    notif_type = 8
                    subject = "Demoted to an Area Chair Position"
                else:
                    detail = "You have been promoted to an Area Chair position."
                    notif_type = 7
                    subject = "Promoted to an Area Chair Position"
            if request.data['new_user_type']==3:
                message = "Role updated to Department Head."
                notif_type = 7
                detail = "You have been promoted to a Department Head position."
                subject = "Promoted to an Department Head position"

            notification = Notification()
            notification.detail = detail
            notification.type = notif_type
            notification.owner_id = faculty
            notification.save()

            send_email(faculty.id, subject, detail)
            
            return Response({"detail": message}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RetrieveAllUnassignedFaculty(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculties = Faculty.objects.filter(
                Q(assignee_id = None),
                Q(is_staff = False),
                Q(birthdate__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(middle_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(extension_name__icontains = search)|
                Q(contact_no__icontains = search)

            ).exclude(accepted_at__isnull=True).exclude(deleted_at__isnull=False).order_by('last_name')
            p = Paginator(faculties, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            faculties = p.get_page(page)

            serializer = ManageFacultiesUnassignmentSerializer(faculties, many=True)
      
            data={
                "faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages
            }   
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllAssignedFaculty(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculty = Faculty.objects.get(id=pk,)
            faculty_serializer = FacultySerializer(faculty, many=False)
            assigned_faculties = Faculty.objects.filter(
                    Q(is_staff = False),
                    Q(assignee_id = faculty.id),
                       Q(birthdate__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(middle_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(extension_name__icontains = search)|
                Q(contact_no__icontains = search)
            ).exclude(accepted_at__isnull=True).exclude(deleted_at__isnull=False).order_by('last_name')
            p = Paginator(assigned_faculties,6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            assigned_faculties = p.get_page(page)
            serializer = ManageFacultiesAssignmentSerializer(assigned_faculties, many=True)
            
            data = {
                "checker": faculty_serializer.data,
                "assigned_faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages, 
            }
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveAllAssignedFacultyForAreaChairHead(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculty = Faculty.objects.get(id=pk,)
            faculty_serializer = FacultySerializer(faculty, many=False)
            assigned_faculties = Faculty.objects.filter(
                    Q(is_staff = False),
                    Q(assignee_id = faculty.id),
                       Q(birthdate__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(middle_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(extension_name__icontains = search)|
                Q(contact_no__icontains = search)
            ).exclude(accepted_at__isnull=True).exclude(deleted_at__isnull=False).order_by('last_name')
            p = Paginator(assigned_faculties,6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            assigned_faculties = p.get_page(page)
            serializer = ManageFacultiesUnassignmentSerializer(assigned_faculties, many=True)
            
            data = {
                "checker": faculty_serializer.data,
                "faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages, 
            }
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveAllNormalFacultyUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculties = Faculty.objects.filter(
                # Q(accepted_at = not None),
                Q(is_staff = False),
                Q(user_type = 1),
                Q(birthdate__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(middle_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(extension_name__icontains = search)|
                Q(contact_no__icontains = search)
            ).exclude(accepted_at__isnull=True).exclude(deleted_at__isnull=False).order_by('last_name')
            p = Paginator(faculties, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            faculties = p.get_page(page)

            serializer = ManageFacultiesUnassignmentSerializer(faculties, many=True)
      
            data={
                "faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages
            }   
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveAllAreaChairUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculties = Faculty.objects.filter(
                # Q(accepted_at = not None),
                Q(is_staff = False),
                Q(user_type = 2),
                Q(birthdate__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(middle_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(extension_name__icontains = search)|
                Q(contact_no__icontains = search)
            ).exclude(accepted_at__isnull=True).exclude(deleted_at__isnull=False).order_by('last_name')
            p = Paginator(faculties, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            faculties = p.get_page(page)

            serializer = ManageFacultiesSerializer(faculties, many=True)
      
            data={
                "faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages
            }   
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RetrieveAllDepartmentHeadUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculties = Faculty.objects.filter(
                # Q(accepted_at = not None),
                Q(is_staff = False),
                Q(user_type = 3),
                Q(birthdate__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(middle_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(extension_name__icontains = search)|
                Q(contact_no__icontains = search)
            ).exclude(accepted_at__isnull=True).exclude(deleted_at__isnull=False).order_by('last_name')
        
            p = Paginator(faculties, 6)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            faculties = p.get_page(page)

            serializer = ManageFacultiesSerializer(faculties, many=True)
      
            data={
                "faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages
            }   
            return Response(data, status=status.HTTP_200_OK)
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
                faculty_prev_assignee = faculty.assignee_id
                faculty.assignee_id = assignedTo
                faculty.save()

                if faculty_prev_assignee != None:
                    detail = f"You have been reassigned to {faculty.last_name}, {faculty.first_name}."
                    subject = "Faculty reassignment"
                else:
                    detail = f"You have been assigned to {faculty.last_name}, {faculty.first_name}."
                    subject = "Faculty assignment"

                notification = Notification()
                notification.detail = detail
                notification.type = 9
                notification.owner_id = faculty
                notification.save()

                send_email(faculty.id, subject, detail)
                
            message = {"detail":"Faculty assigned!"}

            notification = Notification()
            notification.detail = f"You have been assigned faculties."
            notification.type = 10
            notification.owner_id = assignedTo
            notification.save()

            detail2=f"You have been assigned faculties."
            subject2="You have Faculty Assignment"
            send_email(assignedTo.id, subject2, detail2)

            return Response(message,status=status.HTTP_200_OK)
        except:
            message ={'detail': 'Something went wrong!'}
            return Response(message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
