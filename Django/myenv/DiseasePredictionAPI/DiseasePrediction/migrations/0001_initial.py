# Generated by Django 3.2.3 on 2021-05-16 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Symptoms',
            fields=[
                ('SymptomID', models.AutoField(primary_key=True, serialize=False)),
                ('First_Symptom', models.CharField(max_length=100)),
                ('Second_Symptom', models.CharField(max_length=100)),
                ('Third_Symptom', models.CharField(max_length=100)),
                ('Fourth_Symptom', models.CharField(max_length=100)),
            ],
        ),
    ]