from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
class User(AbstractUser):
    email = models.EmailField(unique = True, null=True)
    type = models.IntegerField(null=True, blank=True, default=1)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_activated = models.BooleanField(null=True, blank=True, default=False)

    class Meta:
        ordering = ['last_name']


    def __str__(self):
        return f"{self.email}"

# Kung saka-sakali na si Faculty is User na lang din, palipat na lang nung fields ni Faculty kay user hehe.
# Tapos, lahat ng Faculty na foreign key pakigawa na lang na User 
# faculty_id => user_id

# Faculty
class Faculty(models.Model):
    user_type = models.PositiveSmallIntegerField(default=1) # determines if normal faculty, area chair or dept head
    emp_no = models.CharField(max_length=25, unique=True)
    username = models.CharField(max_length=200, unique=True)
    email_address = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    fname = models.CharField(max_length=200)
    mname = models.CharField(max_length=200, null=True)
    lname = models.CharField(max_length=200)
    ext_name = models.CharField(max_length=200, null=True)
    birthdate = models.DateField()
    civil_status = models.PositiveSmallIntegerField()
    sex = models.PositiveSmallIntegerField()
    house_no = models.PositiveIntegerField()
    street = models.CharField(max_length=200)
    subdivision = models.CharField(max_length=200, null=True)
    barangay = models.CharField(max_length=200)
    municipality = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    zip_code = models.PositiveIntegerField()
    contact_no = models.CharField(max_length=20, unique=True)
    specialization = models.CharField(max_length=200, null=True)
    program = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    assignee_id = models.ForeignKey('self', on_delete=models.CASCADE) #foreign key, area chair or dept head id

# Semester
class Semester(models.Model):
    label = models.CharField(max_length=200)
    school_year = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

# Week
class Week(models.Model):
    label = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE) # fk for semester

# WFAR
class WFAR(models.Model):
    status = models.PositiveSmallIntegerField(default=1) # 1 - not checked, 2 - ok, 3 - with revisions
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    faculty_id = models.ForeignKey(Faculty, on_delete=models.CASCADE) #fk for faculty

# WFAR Entry
class WFAR_Entry(models.Model):
    accomplishment_date = models.DateTimeField(default=datetime.now)
    subject = models.CharField(max_length=200)
    course_year_section = models.CharField(max_length=200)
    no_of_attendees = models.PositiveIntegerField()
    recording_url = models.TextField(max_length=500)
    wfar_id = models.ForeignKey(WFAR, on_delete=models.CASCADE)

# WFAR Entry Attachment
class WFAR_Entry_Attachment(models.Model):
    image_uri = models.ImageField(upload_to='uploads/') # image, paki-palitan na lang 'yung uploads/
    type = models.PositiveSmallIntegerField(default=1) # 1 - meet sc, 2 - activity
    wfar_entry_id = models.ForeignKey(WFAR_Entry, on_delete=models.CASCADE)

# WFAR Entry Learning Activities
class WFAR_Entry_Activity(models.Model):
    description = models.TextField(max_length=500)
    wfar_entry_id = models.ForeignKey(WFAR_Entry, on_delete=models.CASCADE)

# WFAR Comment
class WFAR_Comment(models.Model):
    description = models.TextField(max_length=1000)
    wfar_id = models.ForeignKey(WFAR, on_delete=models.CASCADE)
    faculty_id = models.ForeignKey(Faculty, on_delete=models.CASCADE)
