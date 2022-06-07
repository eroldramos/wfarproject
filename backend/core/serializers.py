from rest_framework import serializers
from core.models import (
    Faculty, 
    Semester, 
    Week, 
    WFAR,
    WFAR_Entry,
    WFAR_Entry_Activity, 
    WFAR_Entry_Attachment,
    WFAR_Comment,
    Notification,
    )
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import datetime, timedelta, date
from django.utils import timezone
import math
class FacultySerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    userType = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'userType', 'profile_picture']

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
        fields = ['id', 'fullname', 'emp_no','username', 'email', 'contact_no', 'createdAt', 'civil_status']

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
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'userType', 'token', 'expirationDate',  'profile_picture']

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
    # assigned_faculties = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields=['id', 'last_name', 'first_name', 'middle_name', 'emp_no','username', 'birthdate', 'email', 'contact_no', 'user_type', ]
    # def get_assigned_faculties(self, obj):
    #     faculties = obj.faculty_set.all()
    #     serializer = ManageFacultiesSerializer(faculties, many=True)
    #     return(serializer.data)

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
        fields = ('id', 'label', 'school_year',
                  'start_date', 'end_date', 'no_of_weeks')



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


class SemesterSerializer(serializers.ModelSerializer):
    current_week = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Semester
        fields = ('id', 'start_date', 'end_date', 'no_of_weeks','label','school_year','current_week')

    def get_current_week(self, obj):
        difference_of_days = date.today()- obj.start_date
        currentWeek = abs(math.floor((difference_of_days.days/7)+1))
        return currentWeek


# ERIKA ---------------------------------





# Basic WFAR 
class WfarEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 'course_year_section', 'deleted_at')

# Archived WFAR Entry
class WfarArchivedEntrySerializer(serializers.ModelSerializer):
    semester = serializers.SerializerMethodField()
    week_no = serializers.SerializerMethodField()
    class Meta:
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 'course_year_section', 'deleted_at', 'semester', 'week_no')

    def get_semester(self, obj):
        return obj.wfar_id.semester_id.school_year + " - " + obj.wfar_id.semester_id.label;

    def get_week_no(self, obj):
        return obj.wfar_id.week_no;

# WFAR with Semester and Week bracket
class WfarSerializer(serializers.ModelSerializer):
    wfar_entries = WfarEntrySerializer(many=True, read_only=True)
    semester = serializers.SerializerMethodField(read_only=True)
    week_bracket = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = WFAR
        fields = ('id', 'status', 'faculty_id','submitted_at', 'week_no', 'semester', 'week_bracket', 'wfar_entries')

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

# Basic WFAR
class WfarSerializer2(serializers.ModelSerializer):

    no_of_entries = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = WFAR
        fields = ('id', 'status', 'created_at', 'updated_at', 'checked_at', 'submitted_at', 'week_no', 'semester_id', 'no_of_entries')

    def get_no_of_entries(self, obj):
        no_of_entries = WFAR_Entry.objects.filter(wfar_id=obj.id);
        return no_of_entries.count()


# WFAR Entry Activity
class WfarEntryActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WFAR_Entry_Activity
        fields = ('id', 'description')

# WFAR Entry Attachment
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

# WFAR Entry with activities and attachments
class WfarEntryViewSerializer(serializers.ModelSerializer):
    wfar_entry_activities = WfarEntryActivitySerializer(many=True, read_only=True)
    wfar_entry_attachments = WfarEntryAttachmentSerializer(many=True, read_only=True)
    class Meta: 
        model = WFAR_Entry
        fields = ('id', 'accomplishment_date', 'subject', 
                    'course_year_section', 'no_of_attendees', 'recording_url',
                    'wfar_entry_activities', 'wfar_entry_attachments');


# Faculty including their WFARs
class FacultyWfarSerializer(serializers.ModelSerializer):

    wfars = serializers.SerializerMethodField()

    class Meta:
        model = Faculty
        fields = ('id', 'first_name', 'middle_name', 'last_name', 'extension_name', 'wfars')
    
    def get_wfars(self, instance):
        semester_id = self.context.get("semester_id")
        current_week_no = self.context.get("current_week_no")

        wfars_instances = instance.wfars.filter(semester_id=semester_id, week_no__lte=current_week_no)
        return WfarSerializer2(wfars_instances, many=True).data

# Faculty including their WFARs for the specified week
class FacultyWeeklyWfarSerializer(serializers.ModelSerializer):

    wfars = serializers.SerializerMethodField()

    class Meta:
        model = Faculty
        fields = ('id', 'first_name', 'middle_name',
                  'last_name', 'extension_name', 'wfars')

    def get_wfars(self, instance):
        semester_id = self.context.get("semester_id")
        week_no = self.context.get("week_no")
        wfar_status = self.context.get("wfar_status")

        if wfar_status == '0' or wfar_status == '1':
            wfars_instances = instance.wfars.filter(semester_id=semester_id, week_no=week_no)
        else:
            wfars_instances = instance.wfars.filter(semester_id=semester_id, week_no=week_no, status=wfar_status)

        return WfarSerializer2(wfars_instances, many=True).data












# SHEEN
#-------DASHBOARD
class CommentsSerializer(serializers.ModelSerializer):
    created_at_fix = serializers.SerializerMethodField(read_only=True)
    wfar_owner_id= serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR_Comment
        fields = ('id','description','wfar_id','faculty_id','wfar_owner_id','created_at_fix','updated_at')

    def get_wfar_owner_id(self, obj):
        num = ""
        for c in str(obj.wfar_id):
            if c.isdigit():
                num = num + c
        wfars = WFAR.objects.get(id=int(num))
        serializer = WfarSerializer(wfars, many=False)
        return serializer.data

    def get_created_at_fix(self, obj):
        d = obj.created_at
        if d is not None:
            diff = timezone.now() - d
            s = diff.seconds
            if diff.days > 30 or diff.days < 0:
                return d.strftime('Y-m-d H:i')
            elif diff.days == 1:
                return 'One day ago'
            elif diff.days > 1:
                return '{} days ago'.format(diff.days)
            elif s <= 1:
                return 'just now'
            elif s < 60:
                return '{} seconds ago'.format(s)
            elif s < 120:
                return 'one minute ago'
            elif s < 3600:
                return '{} minutes ago'.format(round(s/60))
            elif s < 7200:
                return 'one hour ago'
            else:
                return '{} hours ago'.format(round(s/3600))
        else:
            return None       

class GetAllWFAR(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)
    checker = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR
        fields = ('id','status','created_at','updated_at','week_no','checked_at','submitted_at','owner','checker','semester_id')

    def get_owner(self, obj):
        return (ProfileSerializer(obj.faculty_id).data)
    def get_checker(self, obj):
        return (ProfileSerializer(obj.faculty_checker_id).data)



class GetAllUser(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    userType = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Faculty
        fields = ('id', 'username', 'accepted_at','email', 'name','first_name','last_name', 'isAdmin', 'userType', 'profile_picture','assignee_id')

    def get_isAdmin(self, obj):   
        return obj.is_staff
    def get_userType(self, obj):
        return obj.user_type
    def get_name(self, obj):
        name = f"{obj.first_name} {obj.last_name}"
        if name == " ":
            name = obj.email
        return name

class GetAllNotificationSerializer(serializers.ModelSerializer):
    
    notif_at = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Notification
        fields = ('id','detail','type','notif_at','read_at','owner_id','faculty_registered_id','wfar_id','wfar_comment_id')

    def get_notif_at(self, obj):
        d = obj.created_at
        if d is not None:
            diff = timezone.now() - d
            s = diff.seconds
            if diff.days > 30 or diff.days < 0:
                return d.strftime('Y-m-d H:i')
            elif diff.days == 1:
                return 'One day ago'
            elif diff.days > 1:
                return '{} days ago'.format(diff.days)
            elif s <= 1:
                return 'just now'
            elif s < 60:
                return '{} seconds ago'.format(s)
            elif s < 120:
                return 'one minute ago'
            elif s < 3600:
                return '{} minutes ago'.format(round(s/60))
            elif s < 7200:
                return 'one hour ago'
            else:
                return '{} hours ago'.format(round(s/3600))
        else:
            return None       


# EROLD --------------------- WFARCHECKING ----------------------------------


class WFARCheckingFacultySerializer (serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields=['id', 'last_name', 'first_name', 'middle_name', 'profile_picture']


class WFARCheckingWFARSerializer(serializers.ModelSerializer):
    semester =serializers.SerializerMethodField(read_only=True)
    faculty = serializers.SerializerMethodField(read_only=True)
    entries = serializers.SerializerMethodField(read_only=True)
    submitted_at = serializers.SerializerMethodField(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    checked_at = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR
        fields = ['id','status','checked_at', 'submitted_at', 'submitted_at', 'week_no', 'semester','faculty', 'entries', "comments"]

    def get_checked_at(self, obj):
        checked_at_date = None
        if(obj.checked_at):
            checked_at_date = datetime.strftime(obj.checked_at, '%b %d, %Y %I:%M %p')
        return checked_at_date

    def get_submitted_at(self, obj):
        submitted_at_date = None
        if(obj.submitted_at):
            submitted_at_date = datetime.strftime(obj.submitted_at, '%b %d, %Y %I:%M %p')
        return submitted_at_date

    def get_semester(self, obj):
        semester = obj.semester_id
        serializer = SemesterSerializerYearAndSem(semester, many=False)
        return serializer.data
    def get_faculty(self, obj):
        faculty = obj.faculty_id
        serializer = WFARCheckingFacultySerializer(faculty, many=False)
        return serializer.data
    def get_entries(self, obj):
        entries = WFAR_Entry.objects.filter(wfar_id=obj.id)
        
        serializer = WFARCheckingWFAREntriesSerializer(entries, many=True)
        return serializer.data
    def get_comments(self, obj):
        comments = WFAR_Comment.objects.filter(wfar_id=obj.id)
        serializer = WFARCheckingWFARCommentsSerializer(comments, many=True)
        return serializer.data
class WFARCheckingWFAREntriesSerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField(read_only=True)
    activities = serializers.SerializerMethodField(read_only=True)
    accomplishment_date = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR_Entry
        fields = ['id','accomplishment_date','subject','course_year_section','no_of_attendees','recording_url', "attachments", "activities",]
    def get_accomplishment_date(self, obj):
        accomplishment_date = None
        if obj.accomplishment_date:
            accomplishment_date = datetime.strftime(obj.accomplishment_date, '%b %d, %Y')
        return accomplishment_date

    def get_attachments(self, obj):
        attachments = WFAR_Entry_Attachment.objects.filter(wfar_entry_id =obj.id)
        serializer = WFARCheckingWFAREntryAttachmentsSerializer(attachments, many=True)
        return serializer.data
    def get_activities(self, obj):
        activities = WFAR_Entry_Activity.objects.filter(wfar_entry_id=obj.id)
        serializer = WFARCheckingWFAREntryActivitiesSerializer(activities, many=True)
        return serializer.data


class WFARCheckingWFAREntryAttachmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WFAR_Entry_Attachment
        fields = ['id', 'image_uri', 'type']

class WFARCheckingWFAREntryActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WFAR_Entry_Activity
        fields = ['id', 'description']




class WFARCheckingWFARCommentsSerializer(serializers.ModelSerializer):
    faculty = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = WFAR_Comment
        fields = ['id', 'created_at', 'faculty', 'description']
    def get_created_at(self, obj):
        d = obj.created_at
        if d is not None:
            diff = timezone.now() - d
            s = diff.seconds
            if diff.days > 30 or diff.days < 0:
                return d.strftime('Y-m-d H:i')
            elif diff.days == 1:
                return 'One day ago'
            elif diff.days > 1:
                return '{} days ago'.format(diff.days)
            elif s <= 1:
                return 'just now'
            elif s < 60:
                return '{} seconds ago'.format(s)
            elif s < 120:
                return 'one minute ago'
            elif s < 3600:
                return '{} minutes ago'.format(round(s/60))
            elif s < 7200:
                return 'one hour ago'
            else:
                return '{} hours ago'.format(round(s/3600))
        else:
            return None

    def get_faculty(self, obj):
        faculty = obj.faculty_id
        serializer= WFARCheckingFacultySerializer(faculty, many=False)
        return serializer.data



   
