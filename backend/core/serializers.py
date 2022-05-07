from re import T
from rest_framework import serializers
from core.models import Faculty, Semester, Week
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import datetime

class FacultySerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    userType = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'userType']

    def get_isAdmin(self, obj):   
        return obj.is_staff

    def get_userType(self, obj):
        return obj.user_type
    def get_name(self, obj):
        name = f"{obj.first_name} {obj.last_name}"
        if name == " ":
            name = obj.email
        return name

class PendingFacultySerializer(serializers.ModelSerializer):
 
    fullname = serializers.SerializerMethodField(read_only=True)
    createdAt = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields = ['id', 'fullname', 'emp_no','username', 'email', 'contact_no', 'createdAt']

    def get_fullname(self, obj):
        name = f"{obj.last_name}, {obj.first_name} {obj.middle_name}"
        if name == " " or name == "":
            name = obj.email
        return name
    def get_createdAt(self, obj):
        fmt = '%Y-%m-%d'
        return datetime.strftime(obj.created_at, fmt)

        

class FacultySerializerWithToken(FacultySerializer):
    token =  serializers.SerializerMethodField(read_only=True)
    expirationDate =  serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'userType', 'token', 'expirationDate']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    def get_expirationDate(self, obj):
        expirationDate = AccessToken.for_user(obj)
        return str(datetime.now() + expirationDate.lifetime)

class SemesterSerializerYearAndSem(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('id', 'label','school_year')
   
class WeekSerializer(serializers.ModelSerializer):
    labelTouch = serializers.SerializerMethodField(read_only=True)
    startDateTouch = serializers.SerializerMethodField(read_only=True)
    endDateTouch = serializers.SerializerMethodField(read_only=True)
    startDate = serializers.SerializerMethodField(read_only=True)
    endDate = serializers.SerializerMethodField(read_only=True)
    class Meta: 
        model = Week
        fields = ('id','label', 'startDate', 'endDate', 'labelTouch', 'startDateTouch', 'endDateTouch' )

    def get_startDate(self, obj):
        return obj.start_date
    def get_endDate(self, obj):
        return obj.end_date

    def get_labelTouch(self, obj):

        return False if obj.label != "" else True
    def get_startDateTouch(self, obj):
        return False if obj.start_date != "" else True
    def get_endDateTouch(self, obj):
        return False if obj.end_date != "" else True 

class WeeksInASemesterSerializer(serializers.ModelSerializer):
    weeks = serializers.SerializerMethodField(read_only=True)
  
    class Meta:
        model = Semester
        fields = ('id', 'label', 'school_year', 'weeks', )

    def get_weeks(self, obj):
        weeks = obj.week_set.all().order_by('start_date', 'end_date')
        serializer =    WeekSerializer(weeks, many=True)
        return serializer.data

class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Faculty
        fields = '__all__'        
   
    def get_name(self, obj):
        name = f"{obj.first_name} {obj.last_name}"
        if name == " ":
            name = obj.email
        return name
