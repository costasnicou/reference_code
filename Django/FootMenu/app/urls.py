from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

# namespacing
app_name = 'app'

urlpatterns = [
    path("",views.IndexClassView.as_view(),name="index"),
    # instead of passing an id in Detail Class view we pass a pk
    path("<int:pk>",views.FoodDetailClassView.as_view(),name="item_detail"),
    path("add-item",views.AddItemClassView.as_view(),name="add_item"),
    # instead of passing an id in Edit Class view we pass a pk
    path("edit-item/<int:pk>",views.EditItemClassView.as_view(),name="edit_item"),
    path("delete-item/<int:pk>",views.ItemDeleteClassView.as_view(),name="delete_item"),

]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )