from django.urls import path,include
from . import views

urlpatterns = [
    path('notesapi/',views.notes,name='note'),
    path('notesapi/<slug:slug>/',views.notes1,name='note1'),
]
