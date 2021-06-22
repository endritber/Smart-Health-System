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

     sortUrinalysis= async() =>{
        return this.selectedPatient?.urinalysisList.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    sortMetabolicPanel= async() =>{
        return this.selectedPatient?.metabolicPanels.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    sortLiverPanel= async() => {
        return this.selectedPatient?.liverPanels.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    sortCBC= async() =>{
        return this.selectedPatient?.cbCs.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }


    loadPatients = async () => { 
        this.setLoadingIntitial(true);
        try {
            const patients = await agent.Patients.list();    
                patients.forEach(patient=> {
                this.patientRegistry.set(patient.id, patient)
            })
            this.setLoadingIntitial(false);
        }catch(error) {
            console.log(error); 
            this.setLoadingIntitial(false); 
        }
    }

    cancelSelectedPatient = () => {
        this.selectedPatient = undefined;
    }


    loadPatient = async(id:string)=> {
            this.setLoadingIntitial(true);
            try {
                const patient = await agent.Patients.details(id);
                this.setPatient(patient);
                runInAction(()=>{
                    this.selectedPatient=patient;
                    this.selectedPatient.liverPanels.forEach(lp=> {
                        lp.date = lp.date.split('T')[0];
                    })
                    this.selectedPatient.metabolicPanels.forEach(mp=> {
                        mp.date = mp.date.split('T')[0];
                    })
                    this.selectedPatient.urinalysisList.forEach(u=> {
                        u.date = u.date.split('T')[0];
                    })
                    this.selectedPatient.cbCs.forEach(cbc=> {
                        cbc.date = cbc.date.split('T')[0];
                    })
                    this.sortUrinalysis();
                    this.sortMetabolicPanel();
                    this.sortLiverPanel();
                    this.sortCBC();
                    


                })
                this.setLoadingIntitial(false);
                return patient;
            } catch(error) {
                console.log(error);
                this.setLoadingIntitial(false);
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
    selectPatient= (id: string)=> {
        this.selectedPatient = this.patientRegistry.get(id);
    }

    addDoctor = async (patientId:string, doctorId:string) => {
        this.loading = true
        try {
            await agent.Patients.addDoctor(patientId, doctorId)
            runInAction(()=>(
                // this.patientRegistry.set(patientId, );
                // this.selectedPatient = patient;
                this.loading=false))
        }
        catch(error){
            runInAction(()=> (this.loading = false))
        }
    }

}