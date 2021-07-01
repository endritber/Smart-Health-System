import { Allergy } from "./allergy";
import { CBC } from "./cbc";
import { Doctor } from "./doctor";
import { doctorprofile } from "./doctorprofile";
import { LiverPanel } from "./liverpanel";
import { MetabolicPanel } from "./metabolicpanel";
import { Prescription } from "./prescription";
import { Symptoms } from "./symptoms";
import { Urinalysis } from "./urinalysis";
import { Weight } from "./weight";

export interface Patient {
    id:string;
    name: string;
    lastName: string;
    birthDate: string;
    address:string;
    language:string;
    profession:string;
    doctor:doctorprofile;
    prescriptions: Prescription[];
    allergies: Allergy[];
    cbCs: CBC[];
    liverPanels:LiverPanel[];
    metabolicPanels:MetabolicPanel[];
    urinalysisList: Urinalysis[];
    symptoms: Symptoms[];
    weight : Weight [];
    
}
