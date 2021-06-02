import { Doctor } from "./doctor";
import { doctorprofile } from "./doctorprofile";

export interface Patient {
    id:string;
    name: string;
    lastName: string;
    birthDate: string;
    address:string;
    language:string;
    profession:string;
    doctor:doctorprofile;
    labResults: LabResult[];
    
}
