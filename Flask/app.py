from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy  import SQLAlchemy
from form import TheSymptoms
from disease_prediction import message


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/symptoms.db'
app.config['SECRET_KEY'] = 'password'

db= SQLAlchemy(app)

class Symptoms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Symptom1 = db.Column(db.String(240)) 
    Symptom2 = db.Column(db.String(240)) 
    Symptom3 = db.Column(db.String(240)) 
    Symptom4 = db.Column(db.String(240)) 
    Symptom5 = db.Column(db.String(240)) 
    Result = db.Column(db.String(240))


    def __str__(self):
        return f"{self.Symptom1}, {self.Symptom2}, {self.Symptom3}, {self.Symptom4}, {self.Symptom5}, {self.Result}"
 
@app.route('/', methods=['GET','POST'])
def greet():
    request_method = request.method
    sym = Symptoms.query.all() 
    return render_template('hello.html', request_method=request_method, sym = sym)


@app.route('/symptoms', methods=['GET','POST'])
def symptoms():
    symptoms_form = TheSymptoms()  
    if symptoms_form.validate_on_submit():
        sym = Symptoms (
        Symptom1 = symptoms_form.symptom1.data,
        Symptom2 = symptoms_form.symptom2.data,
        Symptom3 = symptoms_form.symptom3.data,
        Symptom4 = symptoms_form.symptom4.data,
        Symptom5 = symptoms_form.symptom5.data,
        Result = '',
        )
        disease = message(sym.Symptom1, sym.Symptom2, sym.Symptom3, sym.Symptom4, sym.Symptom5)
        sym.Result = disease
        db.session.add(sym)
        db.session.commit()
    

        return redirect('/')
    return render_template('symptoms.html', form=symptoms_form)


if __name__ == '__main__':
    app.run(debug=True)
  