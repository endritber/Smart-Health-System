import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface LabResult {
    id: string;
    sample: string;
    problemProportion: string;
    date: string;
    result:string;
    resultProportion: string;
    status: string;
    patient:Patient;
    doctor: Doctor;
}
