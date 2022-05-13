from dataclasses import field, fields
from rest_framework import serializers
from core.models import Faculty, Semester, Week, WFAR, WFAR_Entry
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import datetime, timedelta

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

# class WfarSerializer(serializers.ModelSerializer):
#     wfar_entries = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#     class Meta:
#         model = WFAR
#         fields = ('id', 'status', 'week_no', 'wfar_entries')

# class WfarEntrySerializer(serializers.ModelSerializer):
#     wfar = serializers.PrimaryKeyRelatedField(queryset=WFAR.objects.all(), many=False)
#     class Meta:
#         model = WFAR_Entry
#         fields = ('wfar_id', 'id', 'accomplishment_date', 'subject', 'course_year_section')
    
class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('id', 'start_date', 'end_date', 'no_of_weeks')

class WfarEntrySerializer(serializers.ModelSerializer):
    accomplishment_date = serializers.DateField(format="%B %d")
    class Meta:
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 'course_year_section')

# class WfarSerializer(serializers.ModelSerializer):
#     wfar_entries = WfarEntrySerializer(many=True, read_only=True)
#     # semester = SemesterSerializer(required=True)
#     week_bracket = serializers.SerializerMethodField(read_only=True)
#     # start_date = serializers.DateField(source='semester_id.start_date') # this is your related_name
#     class Meta:
#         model = WFAR
#         fields = ('id', 'status', 'week_no', 'week_bracket', 'wfar_entries')

#     def get_week_bracket(self, obj):
#         return (SemesterSerializer(obj.semester_id).data);

#     # def get_semester_obj(self, obj):
#     #     return Semester.objects.first(pk=obj.semester_id)
#     # def get_week_date(self):
#     #     # week_bracket = 


class WfarSerializer(serializers.ModelSerializer):
    wfar_entries = WfarEntrySerializer(many=True, read_only=True)
    semester = serializers.SerializerMethodField(read_only=True)
    week_bracket = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR
        fields = ('id', 'status', 'week_no', 'semester', 'week_bracket', 'wfar_entries')

    def get_semester(self, obj):
        return (SemesterSerializer(obj.semester_id).data);

    def get_week_bracket(self, obj):
        # step 1
        start_date = obj.semester_id.start_date
        end_date = obj.semester_id.end_date
        no_of_weeks = obj.semester_id.no_of_weeks
        week_no = obj.week_no
        
        week_bracket = [start_date, end_date]
        
        #step 2
        week_bracket[1] = start_date

        # step 3
        for i in range(no_of_weeks + 1):
            week_bracket[1] += timedelta(days=7)
            succeeding_date_day = week_bracket[1].isoweekday()

            # step 3
            if week_bracket[1] > end_date:
                week_bracket[1] = end_date
                break

            # step 4
            if succeeding_date_day != 7:
                week_bracket[1]-=timedelta(days=succeeding_date_day)

            if (i + 1 == week_no):
                break;


        week_bracket[0] = week_bracket[1] - timedelta(6)
        return week_bracket; 


        # # step 2
        # succeeding_date = start_date + timedelta(days=7)
        # succeeding_date_day = succeeding_date.isoweekday()

        # # step 3
        # if succeeding_date > end_date:
        #     succeeding_date = end_date

        # # step 4
        # if succeeding_date_day != 7:
        #     succeeding_date-=timedelta(days=succeeding_date_day)
        
        # # step 5 - I-loop na10n 'to!

    # def get_semester_obj(self, obj):
    #     return Semester.objects.first(pk=obj.semester_id)
    # def get_week_date(self):
    #     # week_bracket = 