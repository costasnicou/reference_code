from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User 
from .models import Profile

class RegisterForm(UserCreationForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ["username","email","password1","password2"]
        # fields = "__all__" if there are other fields the validation fails
        labels = {
            "email":"Enter Your Email",
        }

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields=["image","location"]
        labels = {
            "image":"Upload an image",
            "location":"Location",
        }
