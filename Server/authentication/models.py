from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

# Create your models here.

class CustomUser(AbstractUser):
    email = models.EmailField( unique=True)
    username = models.CharField(max_length=30, unique=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email