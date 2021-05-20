import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Patient } from "../models/patient";
import {v4 as uuid} from 'uuid';


export default class patientStore {

    patientsRegistry= new Map<string, Patient>();
    selectedPatient:Patient |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = true;
    
 
    constructor() {
        makeAutoObservable(this);
    }

    get patientsByDate() {
        return Array.from(this.patientsRegistry.values()).sort((a,b)=> 
        Date.parse(a.birthDate) - Date.parse(b.birthDate)
    );
    }

    loadPatients = async () => {
        try {
            const patients = await agent.Patients.list();    
                patients.forEach(patient=> {
                    patient.birthDate = patient.birthDate.split('T')[0];
                    this.patientsRegistry.set(patient.id, patient)
                })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectPatient = (id: string)=> {
        this.selectedPatient = this.patientsRegistry.get(id);
    }

    cancelSelectedPatient = () => {
        this.selectedPatient = undefined;
    }


    openForm = (id?: string) => {
        id? this.selectPatient(id): this.cancelSelectedPatient();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createPatient= async (patient:Patient) => {
        this.loading =true;
        patient.id = uuid();
        try {
            await agent.Patients.create(patient);
            runInAction(()=> {
                this.patientsRegistry.set(patient.id, patient)
                this.selectedPatient = patient;
                this.editMode = false;
                this.loading = false;
            })

        } catch(error) {
            console.log(error);
            runInAction (()=> {
                this.loading = false;
            })
        }

    }
    updatePatient= async(patient:Patient) => {
        this.loading =true;
        try {
            await agent.Patients.update(patient);
            runInAction(()=> {
                this.patientsRegistry.set(patient.id, patient)
                this.selectedPatient = patient;
                this.editMode = false;
                this.loading = false;
            })

        } catch(error) {
            console.log(error);
            runInAction (()=> {
                this.loading = false;
            })
        }

    }
    deletePatient = async(id: string) => {
        this.loading = true;
        try {
            await agent.Patients.delete(id);
            runInAction(()=> {
                this.patientsRegistry.delete(id)
                if(this.selectedPatient?.id === id) this.cancelSelectedPatient();
                this.loading = false;
            })

        } catch(error) {
            console.log(error);
            runInAction (()=> {
                this.loading = false;
            })
        }
    }

}
