from django import forms
from .models import Item

class AddItem(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['item_name','item_description','item_price','item_img']

        labels = {
            "item_name": "Food Name",
            "item_description": "Food Description",
            "item_Price": "Item Price",
            "item_img": "Image Url",
        }