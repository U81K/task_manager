from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Task

admin.site.register(Task)