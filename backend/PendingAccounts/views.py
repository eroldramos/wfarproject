from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import FacultySerializer, PendingFacultySerializer
from core.permissions import IsAdminUser, IsAdminAreaChairAndDeptHead
from core.models import Faculty
from django.db.models import Q
from datetime import datetime
from django.core.paginator import Paginator
class RetrievePendingFaculties(APIView):
    permission_classes = [IsAdminAreaChairAndDeptHead]
    def get(self, request):
        try:
            search =  request.GET.get('search') if request.GET.get('search') != None else ''
            faculties = Faculty.objects.filter(
                Q(accepted_at = None),
                Q(is_staff = False),
                Q(created_at__icontains = search)|
                Q(emp_no__icontains = search)|
                Q(username__icontains = search)|
                Q(email__icontains = search)|
                Q(first_name__icontains = search)|
                Q(last_name__icontains = search)|
                Q(contact_no__icontains = search)

            )
            p = Paginator(faculties, 1)
            page = request.GET.get('page')
            if page == None or str(page) == "null":
                page = 1

            faculties = p.get_page(page)
       
            serializer = PendingFacultySerializer(faculties, many=True)
            data={
                "faculties": serializer.data,
                "page": int(page),
                "pages": p.num_pages,
                "first_page":1,
                "last_page": p.num_pages
            }   
            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'Something went wrong!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
class AcceptFacultyAccount(APIView):
    permission_classes = [IsAdminAreaChairAndDeptHead]
    def post(self, request):
        try:
            data = request.data['acceptedAccounts']
            for id in data:
                print(id)
                faculty = Faculty.objects.get(id=id)
                faculty.accepted_at = datetime.now()
                faculty.save()
            message = {"detail":"Account(s) accepted!"}
            return Response(message,status=status.HTTP_200_OK)
        except:
            message ={'detail': 'Something went wrong!'}
            return Response(message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
