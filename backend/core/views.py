from datetime import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.permissions import IsAdminUser
from core.models import Semester, Week
from core.serializers import (
    SemesterSerializerYearAndSem , 
    WeekSerializer,
    SemesterAllFieldsSerializer)
from datetime import datetime
from django.db.models import Q
from django.core.paginator import Paginator

from core.serializers import WfarEntryAttachmentSerializer, WFARCheckingWFARSerializer #EROLD
from core.serializers import WfarSerializer, WfarEntrySerializer, WfarArchivedEntrySerializer, WfarEntryViewSerializer, FacultyWfarSerializer
from core.permissions import IsAuthenticated, IsAdminAreaChairAndDeptHead
from core.models import Semester, WFAR_Comment, WFAR, WFAR_Entry, Faculty, WFAR_Entry_Attachment, WFAR_Entry_Activity


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







    





# class GetAllSems(APIView):
#   def  get(self, request):
#     try:
#         semesters = Semester.objects.all()
#         serializer = SemesterSerializerYearAndSem(semesters, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except:
#         return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

# class GetSemDetails(APIView):
#     def get(self, request, sem_id):
#         try:
#             semDetails = Semester.objects.get(id=sem_id)
#             serializer = SemesterSerializerYearAndSem(semDetails, many = False)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

# class AddSem(APIView):
#     permission_classes = [IsAdminUser]
#     def post(self, request):
#         try: 
#             semester = Semester.objects.create(
#                 school_year = request.data['school_year'],
#                 label = request.data['label']
#             )
#             return Response({"detail": "Added sem successfully!!!!   from " + request.user.username}, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)

# class UpdateSem(APIView):
#     def get(self, request, sem_id):
#         try: 
#             semester = Semester.objects.get(id=sem_id)
#             semester.school_year = request.data['school_year']
#             semester.label = request.data['label']
#             semester.save()
#             return Response({"detail": "Sem Updated!"}, status=status.HTTP_200_OK)
#         except:
#             return Response({"detail": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)



# class CreateSem(APIView):
#     permission_classes = [IsAdminUser]
#     # def get(self, request):
#     #     return Response({"detail":"This is an example of GET Request"}, status=status.HTTP_200_OK)

#     def post(self, request):
        
#         print(request.data)
#         semester = Semester.objects.create(
#             label= request.data['label'],
#             school_year= request.data['school_year'],
#             no_of_weeks = request.data['no_of_weeks'],
#             start_date = request.data['start_date'],
#             end_date = request.data['end_date']
#         )
#         return Response({"detail":"Created Sem Successfully"}, status=status.HTTP_200_OK)
   


