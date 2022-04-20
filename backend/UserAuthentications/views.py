from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import FacultySerializerWithToken
from core.models import Faculty
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

# Create your views here.



"""

Create = POST request
Retrieve = Get request
Update = PUT request   
Delete = DELETE request

"""

class FacultyLogin(APIView):
    def post(self, request): #Create
        username = ""
        password = ""

        if request.POST.get('username'):
            username = request.POST.get('username')
        if request.POST.get('password'):
            password = request.POST.get('password')
        
        formErrors = 0

        if "@" in username:
            try:
                user = Faculty.objects.get(email=username)
                username = user.username
            except:
                message = {
                    "detail" : f"Account {username} does not exist!"
                }
                formErrors +=1
                return Response(message, status = status.HTTP_401_UNAUTHORIZED)
        else:
            try:
                user = Faculty.objects.get(username=username)
            except:
                message = {
                    "detail" : f"Account {username} does not exist!"
                }
                formErrors +=1
                return Response(message, status = status.HTTP_401_UNAUTHORIZED)
        
        if formErrors == 0:
            user = authenticate(request, username = username, password = password)

            if user is not None:
                serializer = FacultySerializerWithToken(user)
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                message = {
                    "detail" : "Invalid Credentials"
                }
                return Response(message ,status = status.HTTP_400_BAD_REQUEST)


                
