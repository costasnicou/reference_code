from django.urls import path
from . import views

# namespacing
app_name = 'users'

urlpatterns = [
    path("register/",views.register,name="register"),
    path("login/",views.login_view,name="login"),
    path("logout/", views.logout_view, name="logout"),
  
]