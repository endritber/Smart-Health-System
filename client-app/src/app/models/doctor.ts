import { Patient } from "./patient";

export interface Doctor {
    id: string;
    name: string;
    lastName:string;
    education:string;
    yearsExperience:number;
    specialization:string;
    qualification:string;
    birthDate:string;
    gender:string;
    patients: Patient[];
}
