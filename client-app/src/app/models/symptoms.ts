export interface Symptoms {
    id:number;
    symptom1:string;
    symptom2:string;
    symptom3:string;
    symptom4:string;
    symptom5:string;
    result:string;
}

export class Symptoms implements Symptoms {
    constructor(init?: SymptomsFormValue) {
      Object.assign(this, init);
    }
  }

export class SymptomsFormValue {
    id?: number =parseInt('');
    symptom1: string = '';
    symptom2: string = '';
    symptom3: string = '';
    symptom4: string='';
    symptom5: string = '';
    result: string = '';

    constructor(symptom?: SymptomsFormValue) {
      if (symptom) {
        this.id = symptom.id;
        this.symptom1 = symptom.symptom1;
        this.symptom2 = symptom.symptom2;
        this.symptom3 = symptom.symptom3;
        this.symptom4 = symptom.symptom4;
        this.symptom5 = symptom.symptom5;
        this.result = symptom.result;
      }
    }

}
