import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Prescription } from "../models/prescription";


export default class prescriptionStore {

    prescriptionRegistry= new Map<string, Prescription>();
    selectedPrescription:Prescription |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadPrescriptions = async () => { 
        this.setLoadingInitial(true);
        try {
            const prescriptions = await agent.prescriptions.list();    
                prescriptions.forEach(prescription=> {
                prescription.prescribed = prescription.prescribed.split('T')[0];
                this.prescriptionRegistry.set(prescription.id, prescription)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadPrescription = async(id:string)=> {
        let prescription = this.getPrescription(id);
        if(prescription) {
            this.selectedPrescription = prescription;
            return prescription;
        } else{
            this.loadingInitial=true;
            try {
                prescription = await agent.prescriptions.details(id);
                this.setPrescription(prescription);
                runInAction(()=>{
                    this.selectedPrescription=prescription;
                })
                this.setLoadingInitial(false);
                return prescription;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getPrescription = (id: string) => {
        return this.prescriptionRegistry.get(id);
    }

    private setPrescription = (prescription: Prescription) => {
        this.prescriptionRegistry.set(prescription.id, prescription);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectPrescription= (id: string)=> {
        this.selectedPrescription = this.prescriptionRegistry.get(id);
    }

    cancelSelectedPrescription = () => {
        this.selectedPrescription = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectPrescription(id): this.cancelSelectedPrescription();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createPrescription= async (prescription:Prescription, patientId:string, doctorId: string) => {
        this.loading =true;
        prescription.id = uuid();
        try {
            await agent.prescriptions.create(prescription, patientId, doctorId);
            runInAction(()=> {
                this.prescriptionRegistry.set(prescription.id, prescription);
                this.selectedPrescription = prescription;
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
    updatePrescription= async(prescription:Prescription) => {
        this.loading =true;
        try {
            await agent.prescriptions.update(prescription);
            runInAction(()=> {
                this.prescriptionRegistry.set(prescription.id, prescription);
                this.selectedPrescription = prescription;
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
    deletePrescription = async(id: string) => {
        this.loading = true;
        try {
            await agent.prescriptions.delete(id);
            runInAction(()=> {
                this.prescriptionRegistry.delete(id);
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
