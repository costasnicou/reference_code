from django.shortcuts import render,redirect
from .models import Item
from .forms import AddItem
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# import for samefunctionality as @login_required
from django.contrib.auth.mixins import LoginRequiredMixin
#import for simple ListView, our class must inherit ListView
from django.views.generic.list import ListView
# import for detail view class view,our class must be inherit the DetailView class
from django.views.generic.detail import DetailView
# import for create view class view,our class must be inherit the CreateView class
from django.views.generic.edit import CreateView,UpdateView,DeleteView
from django.urls import reverse_lazy,reverse
# Create your views here.

class IndexClassView(LoginRequiredMixin,ListView):
    #we fist specify the model that we want to use in the list view
    model = Item 
    # for selecting the template html file
    template_name = "index.html"
    # for passing context in our template
    context_object_name = "items" 
    # if login url is not defined in settings 
    # we can define it user using   login_url = "users:login"

# it's job to get only one item from the database
class FoodDetailClassView(LoginRequiredMixin,DetailView):
    model = Item
    template_name = "detail.html"
    context_object_name = "item"


class AddItemClassView(LoginRequiredMixin,CreateView):
    model = Item
    fields = ["item_name","item_description","item_price","item_img"]
    
    """# create view looks for automatically for a template as item_form.html
    # it uses the model to create name for example if our model was food
    # it will look for a template food_form.html but we also CAN DEFINE THE TEMPLATE
    OURSELVES

    -Another issue is the redirection after the form is submitted
    we can define in the model the get_absolute_url method
    
    """
    template_name = "add.html"

    def form_valid(self, form):
        # The problem is that in CreateView.form_valid(), self.object does not exist yet 
        # until Django saves the form.
        # Call super().form_valid(form) first, then access self.object. 
        response = super().form_valid(form)

        item_name = self.object.item_name

        messages.success(
            self.request,
            f"You have successfully created {item_name}!"
        )

        return response


class EditItemClassView(UpdateView):
    model = Item
    fields = ["item_name","item_description","item_price","item_img"]

    """
        also looks for a template but we can use the below for suffix
        template_name_suffix = "_update_form no need for file extension
        becomes item_update_form.html
    """
    template_name = "edit.html"
    """But if the URL doesn't need any dynamic information, success_url = reverse_lazy(...) is simpler and preferable.
    use it to override get_absolute_url method"""

    def get_success_url(self):
        return reverse(
            "app:item_detail",
            kwargs={"pk": self.object.pk}
        )
    

class ItemDeleteClassView(DeleteView):
    model = Item
    template_name = "delete.html"

    # in case we want to do something when the form is valid
    def form_valid(self, form):
        item_name = self.object.item_name

        messages.success(
            self.request,
            f"You have successfully deleted {item_name}"
        )

        return super().form_valid(form)



    # def get_success_url(self):
    #     return reverse("app:index")
    
    # in case we have no url arguments we can use reverse_lazy function
    # with success_url

    success_url = reverse_lazy("app:index")

    
  