from flask import Flask, request, render_template, redirect, url_for, jsonify, Response
from flask_sqlalchemy  import SQLAlchemy
from disease_prediction import message
from flask_cors import CORS, cross_origin
from flask_marshmallow import Marshmallow


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/endritberisha/Demo/Smart-Health-System/API/SHSystem.db'
app.config['SECRET_KEY'] = 'password'

db= SQLAlchemy(app)
ma =Marshmallow(app)
CORS(app)

class Symptoms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symptom1 = db.Column(db.String(240)) 
    symptom2 = db.Column(db.String(240)) 
    symptom3 = db.Column(db.String(240)) 
    symptom4 = db.Column(db.String(240)) 
    symptom5 = db.Column(db.String(240)) 
    result = db.Column(db.String(240))
    patientId = db.Column(db.String(240))


    def __init__(self, symptom1,symptom2, symptom3, symptom4, symptom5, result, patientId):
        self.symptom1 = symptom1
        self.symptom2 = symptom2
        self.symptom3 = symptom3
        self.symptom4 = symptom4
        self.symptom5 = symptom5
        self.result = result
        self.patientId = patientId

class SymptomsSchema(ma.Schema) :
    class Meta:
        fields=('id','symptom1','symptom2','symptom3','symptom4','symptom5','result', 'patientId')

symptom_schema = SymptomsSchema()
symptoms_schema = SymptomsSchema(many=True)

 
@app.route('/getPredictions', methods=['GET'])
def getSymptoms():
    all_symptoms = Symptoms.query.all()
    results = symptoms_schema.dump(all_symptoms)
    return jsonify(results) 

@app.route('/getPrediction/<id>', methods=['GET'])
def getSymptom(id):
    symptom = Symptoms.query.get(id)
    return symptom_schema.jsonify(symptom)

@app.route('/addPrediction/<patientId>', methods=['POST'])
def add_prediction(patientId):
        symptom1 = request.json['symptom1']
        symptom2 = request.json['symptom2']
        symptom3 = request.json['symptom3']
        symptom4 = request.json['symptom4']
        symptom5 = request.json['symptom5']
        patientId = patientId

        disease = message(symptom1, symptom2, symptom3, symptom4, symptom5)
        result = disease
        sym = Symptoms(symptom1, symptom2, symptom3, symptom4, symptom5, result, patientId)
        db.session.add(sym)
        db.session.commit()
        response = symptom_schema.jsonify(sym)
        return response

@app.route('/delete/<id>', methods=['DELETE'])
def delete_prediction(id):
    symptom = Symptoms.query.get(id)
    db.session.delete(symptom)
    db.session.commit()
    return symptom_schema.jsonify(symptom)



if __name__ == '__main__':
    app.run(debug=True, port=8080)
  