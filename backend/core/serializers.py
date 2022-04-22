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
    class Meta: 
        model = Week
        fields = ('id','label', 'start_date', 'end_date' )

class WeeksInASemesterSerializer(serializers.ModelSerializer):
    weeks = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Semester
        fields = ('id', 'label', 'school_year', 'weeks')

    def get_weeks(self, obj):
        weeks = obj.week_set.all()
        serializer =    WeekSerializer(weeks, many=True)
        return serializer.data