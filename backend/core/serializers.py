from dataclasses import field, fields
from rest_framework import serializers
from core.models import Faculty, Semester, Week, WFAR, WFAR_Entry, WFAR_Entry_Activity, WFAR_Entry_Attachment
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

class FacultySerializerWithAcceptedField(FacultySerializer):
    status =  serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'userType', 'status']
    def get_status(self, obj):
        status = obj.accepted_at
        message = str(status) 
        if status == None:
            message = 'Pending'
        return message
        
class ManageFacultiesSerializer(FacultySerializerWithAcceptedField):
    
    class Meta:
        model = Faculty
        fields=['id', 'last_name', 'first_name', 'middle_name', 'emp_no','username', 'birthdate', 'email', 'contact_no', 'user_type', 'profile_picture']

class ManageFacultiesUnassignmentSerializer(ManageFacultiesSerializer):
    assignee_id= ManageFacultiesSerializer(read_only=True)
    class Meta:
        model = Faculty
        fields=['id', 'last_name', 'first_name', 'middle_name', 'emp_no','username', 'birthdate', 'email', 'contact_no', 'user_type', 'assignee_id']


class ManageFacultiesAssignmentSerializer(ManageFacultiesSerializer):
    assigned_faculties = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields=['id', 'last_name', 'first_name', 'middle_name', 'emp_no','username', 'birthdate', 'email', 'contact_no', 'user_type', 'assigned_faculties']
    def get_assigned_faculties(self, obj):
        faculties = obj.faculty_set.all()
        serializer = ManageFacultiesSerializer(faculties, many=True)
        return(serializer.data)

class SemesterSerializerYearAndSem(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('id', 'label','school_year', 'is_active')
   
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

class SemesterAllFieldsSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Semester
        fields = ('id', 'label', 'school_year', 'start_date', 'end_date')



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


# ERIKA
class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ('id', 'start_date', 'end_date', 'no_of_weeks')

class WfarEntrySerializer(serializers.ModelSerializer):
    # accomplishment_date = serializers.DateField(format="%B %d")
    class Meta:
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 'course_year_section', 'deleted_at')

class WfarArchivedEntrySerializer(serializers.ModelSerializer):
    # accomplishment_date = serializers.DateField(format="%B %d")
    semester = serializers.SerializerMethodField()
    week_no = serializers.SerializerMethodField()
    class Meta:
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 'course_year_section', 'deleted_at', 'semester', 'week_no')

    def get_semester(self, obj):
        return obj.wfar_id.semester_id.school_year + " - " + obj.wfar_id.semester_id.label;

    def get_week_no(self, obj):
        return obj.wfar_id.week_no;

class WfarSerializer(serializers.ModelSerializer):
    wfar_entries = WfarEntrySerializer(many=True, read_only=True)
    semester = serializers.SerializerMethodField(read_only=True)
    week_bracket = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = WFAR
        fields = ('id', 'status', 'submitted_at', 'week_no', 'semester', 'week_bracket', 'wfar_entries')

    def get_semester(self, obj):
        return (SemesterSerializer(obj.semester_id).data)

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

class WfarEntryActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WFAR_Entry_Activity
        fields = ('id', 'description')

class WfarEntryAttachmentSerializer(serializers.ModelSerializer):
    image_uri = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR_Entry_Attachment
        fields = ('id', 'image_uri', 'type')

    def get_image_uri(self, obj):
        # return obj.image_uri.url
        request = self.context.get('request')
        imgage_uri = obj.image_uri.url
        return request.build_absolute_uri(imgage_uri)


    # def get_image_uri(self, obj):
    #     # request = self.context.get('request')
    #     image_uri = obj.image_uri.url
    #     return image_uri;


class WfarEntryViewSerializer(serializers.ModelSerializer):
    wfar_entry_activities = WfarEntryActivitySerializer(many=True, read_only=True)
    wfar_entry_attachments = WfarEntryAttachmentSerializer(many=True, read_only=True)
    class Meta: 
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 
                    'course_year_section', 'no_of_attendees', 'recording_url',
                    'wfar_entry_activities', 'wfar_entry_attachments');