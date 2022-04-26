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
                if not user.is_staff and user.accepted_at:
                    serializer = FacultySerializerWithToken(user, many=False)
                    return Response(serializer.data, status = status.HTTP_200_OK)
                if not user.is_staff and not user.accepted_at:
                    message = {
                        "detail": "Login declined! Please contact your administrator to validate your account."
                    }
                    return Response(message, status = status.HTTP_401_UNAUTHORIZED)
                if user.is_staff:
                    message = {
                    "detail" : "Access denied!"
                    }
                    return Response(message ,status = status.HTTP_403_FORBIDDEN)
            else:
                message = {
                    "detail" : "Invalid credentials."
                }
                return Response(message ,status = status.HTTP_400_BAD_REQUEST)

class AdminLogin(APIView):
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
                if user.is_staff:
                    serializer = FacultySerializerWithToken(user, many=False)
                    return Response(serializer.data, status = status.HTTP_200_OK)
                if not user.is_staff:
                    message = {
                    "detail" : "Access denied!"
                    }
                    return Response(message ,status = status.HTTP_403_FORBIDDEN)
            else:
                message = {
                    "detail" : "Invalid credentials."
                }
                return Response(message ,status = status.HTTP_400_BAD_REQUEST)

class FacultyRegister(APIView):
    def post(self, request):
        formErrors = 0
        errors = []
        if Faculty.objects.filter(username=request.data['username']).exists():
            errors.append({"usernameErr": f"{request.data['username']} already exists!"})
            formErrors += 1
        if Faculty.objects.filter(email=request.data['email']).exists():
            errors.append({"emailErr": f"{request.data['email']} already exists"})
            formErrors += 1
        if Faculty.objects.filter(emp_no=request.data['emp_no']).exists():
            errors.append({"empNoErr": f"{request.data['emp_no']} already exists"})
            formErrors += 1
        if Faculty.objects.filter(contact_no=request.data['contact_no']).exists():
            errors.append({"contactNoErr": f"{request.data['contact_no']} already exists"})
            formErrors += 1

        if formErrors == 0:
            try:
                data = request.data
                user = Faculty.objects.create(
                first_name = data['first_name'],
                last_name = data['last_name'],
                middle_name = data['middle_name'],
                extension_name = data['extension_name'],
                username = data['username'],
                email = data['email'],
                password = make_password(data['password']),
                emp_no = data['emp_no'],
                birthdate = data['birthdate'],
                civil_status = data['civil_status'],
                sex = data['sex'],
                house_no = data['house_no'],
                street = data['street'],
                subdivision = data['subdivision'],
                barangay = data['barangay'],
                municipality = data['municipality'],
                province = data['province'],
                zip_code = data['zip_code'],
                contact_no = data['contact_no'],
                )
            
                return Response({"detail": "Registered successfully!"}, status=status.HTTP_200_OK)
            except:
                return Response({"detail": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            return Response({"errors": errors}, status=status.HTTP_401_UNAUTHORIZED)
        



                
