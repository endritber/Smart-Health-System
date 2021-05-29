from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField


class TheSymptoms(FlaskForm):
    symptom1 = TextAreaField(label="Symptom 1") 
    symptom2 = TextAreaField(label="Symptom 2") 
    symptom3 = TextAreaField(label="Symptom 3") 
    symptom4 = TextAreaField(label="Symptom 4") 
    symptom5 = TextAreaField(label="Symptom 5") 
    submit = SubmitField('Submit symptoms')


