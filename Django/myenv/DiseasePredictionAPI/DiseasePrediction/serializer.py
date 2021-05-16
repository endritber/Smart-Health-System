from rest_framework import serializers
from .models import Symptoms


class SymptomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptoms
        fields = ('SymptomID',
                  'First_Symptom',
                  'Second_Symptom',
                  'Third_Symptom',
                  'Fourth_Symptom')