from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

# namespacing
app_name = 'app'

urlpatterns = [
    path("",views.index,name="index"),
    path("<int:id>",views.item_detail,name="item_detail"),
    path("add-item",views.add_item,name="add_item"),
    path("edit-item/<int:id>",views.edit_item,name="edit_item"),
    path("delete-item/<int:id>",views.delete_item,name="delete_item"),

]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )