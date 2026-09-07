from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout
from django.views.decorators.http import require_POST
from django.contrib import messages
from .forms import RegisterForm,ProfileForm
from django.contrib.auth.decorators import login_required
from .models import Profile

# Create your views here.
def register(request):
    form = RegisterForm()
    
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request,f"Welcome {username}, your account has been successfuly created")
            return redirect('users:login')
    return render(request,'users/register.html',{
        "form":form,
        
    })
"""
but then you created your own function also called login, which overrides
that name. There is also a second issue: AuthenticationForm should receive
request separately and POST data through data=.
"""
def login_view(request):
    form = AuthenticationForm()
    login_page = True
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            username = user.username
            messages.success(request,f"Welcome {username}, your have successfuly logged in!")
            return redirect("app:index")
    return render(request,'users/login.html',{
        "form":form,
        "login_page":login_page,
    })

@require_POST
def logout_view(request):
    logout(request)
    return redirect("users:login")

@login_required
def profile(request):

    profile = Profile.objects.get(user=request.user)
    form = ProfileForm(instance=profile)
    if request.method == "POST":
        form = ProfileForm(request.POST,request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect("users:profile")
            
    return render(request,'users/profile.html',{
        "profile":profile,
        "form":form,
    })