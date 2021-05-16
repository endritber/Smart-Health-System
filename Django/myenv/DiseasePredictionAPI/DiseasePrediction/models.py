from django.db import models

class Symptoms(models.Model):
    SymptomID = models.AutoField(primary_key=True)
    First_Symptom = models.CharField(max_length=100)
    Second_Symptom = models.CharField(max_length=100)
    Third_Symptom = models.CharField(max_length=100)
    Fourth_Symptom = models.CharField(max_length=100)