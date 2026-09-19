from django.shortcuts import render,redirect
from .models import Item
from .forms import AddItem
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from .serializers import ItemsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.


#----------start rest api------------------------#
# manual conversion to json
def items_json(request):
    items = Item.objects.all().values("id","item_name","item_description","item_price","item_img")

    return JsonResponse(list(items),safe=False)

# using serialization list items
@api_view(["GET"])
def item_list_api(request):
    items = Item.objects.all()
    serializer = ItemsSerializer(items,many=True)
    return Response(serializer.data)


#GET Single item API
@api_view(["GET"])
def get_single_api(request,id):
    if request.method == "GET":     
        item = Item.objects.get(pk=id)  
        serializer = ItemsSerializer(item,many=False)
        return Response(serializer.data)

# POST single item API
@api_view(["POST"])
def post_single_api(request):
    if request.method == "POST":
        serializer = ItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


#GET, PUT, DELETE Single item API
@api_view(["GET","PUT","DELETE"])
def put_single_api(request,id):
    item = Item.objects.get(pk=id)
    if request.method == "GET":          
            serializer = ItemsSerializer(item)
            return Response(serializer.data)
    if request.method == "PUT":
        serializer = ItemsSerializer(item,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    if request.method == "DELETE":
        item.delete()
        return Response({"message":"Item has been deleted Successfully"})



#---------- end rest api-----------------------#
@login_required(login_url="users:login")
def index(request):
    items = Item.objects.all().order_by("-id")
   
    return render(request,"index.html",{
        "items":items,
    })


def item_detail(request,id):
    item = Item.objects.get(pk=id)

    return render(request,"detail.html",{
        "item":item,
    })


def add_item(request):
    form = AddItem()
    if request.method == "POST":
        form = AddItem(request.POST)
        if form.is_valid():
            cleaned_data = form.cleaned_data
            item_name = cleaned_data.get('item_name')
            item_description = cleaned_data.get('item_description')
            item_price = cleaned_data.get('item_price')
            item_img = cleaned_data.get('item_img')

            record = Item(item_name,item_description,item_price,item_img)
            form.save()
            messages.success(request,f"You have successfully added {item_name}!")
            return redirect('app:index')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, error)
            
        
    
    return render(request,"add.html",{
        "form":form,
    })
        


def edit_item(request,id):
    item = Item.objects.get(pk=id)

    form = AddItem(initial={
        'item_name':item.item_name,
        'item_description':item.item_description,
        'item_price':item.item_price,
        'item_img':item.item_img,
    })

    if request.method == "POST":
        form = AddItem(request.POST)
        if form.is_valid():
            cleaned_data = form.cleaned_data
            item_name = cleaned_data.get('item_name')
            item_description = cleaned_data.get('item_description')
            item_price = cleaned_data.get('item_price')
            item_img = cleaned_data.get('item_img')

            item.item_name = item_name
            item.item_description = item_description
            item.item_price = item_price
            item.item_img = item_img
            # in the update case we save the updated item not the form it self.
            item.save()
            messages.success(request,f"You have successfully edited {item_name}!")
            return redirect('app:item_detail',id=id)

    return render(request,"edit.html",{
        "form":form,
        "item":item,
    })

def delete_item(request,id):
    item = Item.objects.get(pk=id)

    if request.method == "POST":
        messages.error(request,f"You have successfuly deleted {item.item_name}")
        item.delete()
      
        return redirect('app:index')
  
    return render(request,"delete.html",{
       
        "item":item,
    })

