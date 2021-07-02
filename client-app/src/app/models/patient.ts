import { Allergy } from "./allergy";
import { CBC } from "./cbc";
import { Doctor } from "./doctor";
import { doctorprofile } from "./doctorprofile";
import { Height } from "./height";
import { LiverPanel } from "./liverpanel";
import { MetabolicPanel } from "./metabolicpanel";
import { Prescription } from "./prescription";
import { Symptoms } from "./symptoms";
import { Urinalysis } from "./urinalysis";
import { WaterIntake } from "./waterintake";
import { Weight } from "./weight";

export interface Patient {
    id:string;
    name: string;
    lastName: string;
    birthDate: string;
    address:string;
    language:string;
    profession:string;
    city :string;
    area:string;
    information :string;
    number :string;
    bloodGroup:string; 
    doctor:doctorprofile;
    prescriptions: Prescription[];
    allergies: Allergy[];
    cbCs: CBC[];
    liverPanels:LiverPanel[];
    metabolicPanels:MetabolicPanel[];
    urinalysisList: Urinalysis[];
    symptoms: Symptoms[];
    weight : Weight [];
    height : Height [];
    waterIntake : WaterIntake [];
    
}

export class Patient implements Patient {
    constructor(init?: PatientFormValues) {
      Object.assign(this, init);
    }
  }

  export class PatientFormValues {
    id?:string = undefined;
    name: string = '';
    lastName: string = '';
    birthDate: string= '';
    address:string = '';
    language:string = '';
    profession:string ='';
    city :string = '';
    area:string = '';
    information :string = '';
    number :string = '';
    bloodGroup:string ='';

    constructor(patient?: PatientFormValues) {
      if (patient) {
        this.id = patient.id;
        this.name = patient.name;
        this.lastName = patient.lastName;
        this.birthDate = patient.birthDate;
        this.city = patient.city;
        this.language = patient.language;
        this.area = patient.area;
        this.profession=patient.profession;
        this.number = patient.number;
        this.bloodGroup = patient.bloodGroup;
        this.address = patient.address;
        this.information = patient.information

      }
    }
  }

