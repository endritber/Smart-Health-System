import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Doctor } from "../models/doctor";
import { Patient } from "../models/patient";

 

export default class patientStore {
    
    patientRegistry = new Map<string, Patient>();
    selectedPatient: Patient | undefined = undefined;
    doctor: Doctor | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor () {
        makeAutoObservable(this)
    }



    loadPatient = async(id:string)=> {
        let patient = this.getPatient(id);
        if(patient) {
            this.selectedPatient = patient;
            return patient;
        } else{
            this.loadingInitial=true;
            try {
                patient = await agent.Patients.details(id);
                this.setPatient(patient);
                runInAction(()=>{
                    this.selectedPatient=patient;
                })
                this.setLoadingIntitial(false);
                return patient;
            } catch(error) {
                console.log(error);
                this.setLoadingIntitial(false);
            }
        }
    }

    private getPatient = (id: string) => {
        return this.patientRegistry.get(id);
    }

    private setPatient = (patient: Patient) => {
        this.patientRegistry.set(patient.id, patient);
    }
    setLoadingIntitial = (state:boolean) => {
        this.loadingInitial=state
    }


    updatePatient = async (patient: Patient)=>{
        this.loading=true;
        try{
            await agent.Patients.update(patient);
            runInAction(()=>{
                this.patientRegistry.set(patient.id, patient);
                this.selectedPatient = patient;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error) {
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    addDoctor = async (patientId:string, doctorId:string) => {
        this.loading = true
        try {
            await agent.Patients.addDoctor(patientId, doctorId)
            runInAction(()=>(this.loading=false))
        }
        catch(error){
            runInAction(()=> (this.loading = false))
        }
    }

}