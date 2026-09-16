from django import forms
from .models import Item

class AddItem(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['item_name','item_description','item_price','item_img']

        labels = {
            "item_name": "Food Name",
            "item_description": "Food Description",
            "item_price": "Item Price",
            "item_img": "Image Url",
        }

        # adding widget attributes, widgets are just fields
        widgets = {
            "item_name":forms.TextInput(attrs={"placeholder":"Enter Food name","required":True,"class":"test"}),
            "item_description":forms.TextInput(attrs={"placeholder":"Enter Food item description","required":False,"class":"test"}),
            "item_price":forms.NumberInput(attrs={"placeholder":"Enter food item price e.g 100","required":False,"class":"test"}),
            "item_img":forms.URLInput(attrs={"placeholder":"Enter food item image url","required":False,"class":"test"})
        }

    # field validation with clean method
    def clean_item_price(self):
        price = self.cleaned_data["item_price"]
        if price < 0:
            raise forms.ValidationError("Price cannot be negative")
        return price

    # form level validation
    # for example compare two field

    def clean(self):
        if self.cleaned_data['item_name'] == self.cleaned_data['item_description']:
            raise forms.ValidationError("Item name cannot be the same as item description")
        else:
            return
