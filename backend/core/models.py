from tkinter.tix import Tree
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

# Faculty
class Faculty(models.Model):
    user_type = models.PositiveSmallIntegerField(default=1)
    emp_no = models.CharField(max_length=25, unique=True)
    username = models.CharField(max_length=200, unique=True)
    email_address = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    fname = models.CharField(max_length=200)
    mname = models.CharField(max_length=200, null=True)
    lname = models.CharField(max_length=200)
    ext_name = models.CharField(max_length=200, null=True)
    birthdate = models.DateField
    civil_status = models.PositiveSmallIntegerField
    sex = models.PositiveSmallIntegerField
    house_no = models.PositiveIntegerField
    street = models.CharField(max_length=200)
    subdivision = models.CharField(max_length=200, null=True)
    barangay = models.CharField(max_length=200)
    municipality = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    zip_code = models.PositiveIntegerField
    contact_no = models.CharField(max_length=20, unique=True)
    specialization = models.CharField(max_length=200, null=True)
    program = models.CharField(max_length=200, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
