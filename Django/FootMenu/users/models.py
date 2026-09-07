from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    """
    One user will have one profile and vice versa
    also on_delete=models.CASCADE means that when the user is deleted
    the profile will be also deleted
    
    """
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(default="profile_pics/profile.png",upload_to="profile_pics")
    location = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username