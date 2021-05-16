from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse


from .models import Symptoms
from .serializer import SymptomsSerializer

from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def symptomApi(request,id=0):
    if request.method=='GET':
        symptoms = Symptoms.objects.all()
        symptoms_serializer = SymptomsSerializer(symptoms, many=True)
        return JsonResponse(symptoms_serializer.data, safe=False)

    elif request.method=='POST':
        symptoms_data=JSONParser().parse(request)
        symptoms_serializer = SymptomsSerializer(data=symptoms_data)
        if symptoms_serializer.is_valid():
            symptoms_serializer.save()
            return JsonResponse("Added Successfully!!" , safe=False)
        return JsonResponse("Failed to Add.",safe=False)
    
    elif request.method=='PUT':
        symptoms_data = JSONParser().parse(request)
        symptom=Symptoms.objects.get(SymptomID=symptoms_data['SymptomID'])
        symptoms_serializer=SymptomsSerializer(symptom,data=symptoms_data)
        if symptoms_serializer.is_valid():
            symptoms_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        symptom=Symptoms.objects.get(SymptomID=id)
        symptom.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
