from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout
from django.views.decorators.http import require_POST
# Create your views here.
def register(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('users:register')
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
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("app:index")
    return render(request,'users/login.html',{
        "form":form,
    })

@require_POST
def logout_view(request):
    logout(request)
    return redirect("users:login")