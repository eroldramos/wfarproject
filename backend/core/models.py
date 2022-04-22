from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser

class Faculty(AbstractUser):
    # Mayroong default email yung AbstractUser, have to call it again here para ioverride para don sa unique=True
    # Mayroon narin username password
    # Bale pag ni call ung field user.password, kahit di man kita dito ung password field
    email = models.EmailField(max_length=100, unique=True)
    user_type = models.PositiveSmallIntegerField(default=1) # determines if normal faculty, area chair or dept head
    emp_no = models.CharField(max_length=25, unique=True)
    # fname = models.CharField(max_length=200) remove na natin kasi may first_name naman kay abstract user
    middle_name = models.CharField(max_length=200, null=True) # edited column title
    # lname = models.CharField(max_length=200) remove na natin kasi may last_name naman kay abstract user
    accepted_at = models.DateTimeField(null=True)
    extension_name = models.CharField(max_length=200, null=True) # edited column title
    birthdate = models.DateField(null=True) # added null=true, error upon createsuperuser, can be set new value upon registration 
    civil_status = models.PositiveSmallIntegerField(default=0) # added default=0, error upon createsuperuser due to can't be null
    sex = models.PositiveSmallIntegerField(default=0)
    house_no = models.PositiveIntegerField(default=0)
    street = models.CharField(max_length=200)
    subdivision = models.CharField(max_length=200, null=True)
    barangay = models.CharField(max_length=200)
    municipality = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    zip_code = models.PositiveIntegerField(default=0)
    contact_no = models.CharField(max_length=20, unique=True)
    specialization = models.CharField(max_length=200, null=True)
    program = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    assignee_id = models.ForeignKey('self', on_delete=models.CASCADE, null=True) #foreign key, area chair or dept head id
    # added null=True for assignee_id to avoid can't be null error
    class Meta:
        ordering = ['last_name'] #para saan pala 'to?


    def __str__(self):
        return f"{self.email}"

# class AssignFaculty(models.Model):
#     pass

# Kung saka-sakali na si Faculty is User na lang din, palipat na lang nung fields ni Faculty kay user hehe.
# Tapos, lahat ng Faculty na foreign key pakigawa na lang na User 
# faculty_id => user_id

# Faculty
# class Faculty(models.Model):
#     user_type = models.PositiveSmallIntegerField(default=1) # determines if normal faculty, area chair or dept head
#     emp_no = models.CharField(max_length=25, unique=True)
#     username = models.CharField(max_length=200, unique=True)
#     email_address = models.CharField(max_length=100, unique=True)
#     password = models.CharField(max_length=100)
#     fname = models.CharField(max_length=200)
#     mname = models.CharField(max_length=200, null=True)
#     lname = models.CharField(max_length=200)
#     ext_name = models.CharField(max_length=200, null=True)
#     birthdate = models.DateField()
#     civil_status = models.PositiveSmallIntegerField()
#     sex = models.PositiveSmallIntegerField()
#     house_no = models.PositiveIntegerField()
#     street = models.CharField(max_length=200)
#     subdivision = models.CharField(max_length=200, null=True)
#     barangay = models.CharField(max_length=200)
#     municipality = models.CharField(max_length=200)
#     province = models.CharField(max_length=200)
#     zip_code = models.PositiveIntegerField()
#     contact_no = models.CharField(max_length=20, unique=True)
#     specialization = models.CharField(max_length=200, null=True)
#     program = models.CharField(max_length=200, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     deleted_at = models.DateTimeField(null=True)
#     assignee_id = models.ForeignKey('self', on_delete=models.CASCADE) #foreign key, area chair or dept head id

# Semester
class Semester(models.Model):
    label = models.CharField(max_length=200)
    school_year = models.CharField(max_length=200) # naulit lang
    created_at = models.DateTimeField(auto_now_add=True) # datefield lang
    updated_at = models.DateTimeField(auto_now=True) #datefield lang
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
    checked_at = models.DateTimeField(null=True)
    faculty_id = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='faculty_id') #fk for the faculty who uploaded
    faculty_checker_id = models.ForeignKey(Faculty, on_delete=models.CASCADE, null=True, related_name='faculty_checker_id') # fk for the faculty who checked it ** pinagiisipan ko pa hehe
    week_id = models.ForeignKey(Week, on_delete=models.CASCADE, null=True, related_name='week_id') #fk para don sa week san iuupload yung WFAR (?)
# WFAR Entry
class WFAR_Entry(models.Model):
    accomplishment_date = models.DateTimeField(default=datetime.now)
    subject = models.CharField(max_length=200)
    course_year_section = models.CharField(max_length=200)
    no_of_attendees = models.PositiveIntegerField()
    recording_url = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
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
