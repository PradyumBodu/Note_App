from django.shortcuts import render
from .serializer import Noteserializer
from .models import Note
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET','POST'])
def notes(request):

    if request.method == 'GET':
        note = Note.objects.all()
        serializer = Noteserializer(note,many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer =  Noteserializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def notes1(request,slug):

    try:
        note = Note.objects.get(slug = slug)

    except Note.DoesNotExist:
        return Response({'error':'Page Not Found'},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = Noteserializer(note)
        return Response(serializer.data)

        

    if request.method == 'PUT':
        serializer = Noteserializer(note,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

    if request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)