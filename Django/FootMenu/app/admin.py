from django.contrib import admin
from .models import Item
from users.models import Profile

# Register your models here.
admin.site.register(Item)
admin.site.register(Profile)