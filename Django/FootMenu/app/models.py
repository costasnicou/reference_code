from django.db import models

# Create your models here.
class Item(models.Model):
    item_name = models.CharField(max_length=200)
    item_description = models.CharField()
    item_price = models.IntegerField()
    item_img = models.URLField(max_length=500,default="https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png")

    def __str__(self):
        return self.item_name