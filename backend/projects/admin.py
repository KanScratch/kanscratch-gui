from django.contrib import admin

from .models import User, Classroom, Student, Instructor

# Register your models here.
admin.site.register(User)
admin.site.register(Classroom)
admin.site.register(Student)
admin.site.register(Instructor)
