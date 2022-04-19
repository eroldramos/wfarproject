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


