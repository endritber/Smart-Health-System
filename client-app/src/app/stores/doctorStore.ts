import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Doctor } from "../models/doctor";


export default class doctorStore {
    
    doctorRegistry = new Map<string, Doctor>();
    selectedDoctor: Doctor | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor () {
        makeAutoObservable(this)
    }

    get getDoctors() {
        return Array.from(this.doctorRegistry.values());
    }

    loadDoctors = async () => { 
        this.setLoadingIntitial(true);
        try {
            const doctors = await agent.Doctors.list();    
                doctors.forEach(doctor=> {
                this.doctorRegistry.set(doctor.id, doctor)
            })
            this.setLoadingIntitial(false);
        }catch(error) {
            console.log(error); 
            this.setLoadingIntitial(false); 
        }
    }



    loadDoctor = async(id:string)=> {
        let doctor = this.getDoctor(id);
        if(doctor) {
            this.selectedDoctor = doctor;
            return doctor;
        } else{
            this.loadingInitial=true;
            try {
                doctor = await agent.Doctors.details(id);
                this.setDoctor(doctor);
                runInAction(()=>{
                    this.selectedDoctor=doctor;
                })
                this.setLoadingIntitial(false);
                return doctor;
            } catch(error) {
                console.log(error);
                this.setLoadingIntitial(false);
            }
        }
    }

    private getDoctor = (id: string) => {
        return this.doctorRegistry.get(id);
    }

    private setDoctor = (doctor: Doctor) => {
        this.doctorRegistry.set(doctor.id, doctor);
    }
    setLoadingIntitial = (state:boolean) => {
        this.loadingInitial=state
    }


    updateDoctor = async (doctor: Doctor)=>{
        this.loading=true;
        try{
            await agent.Doctors.update(doctor);
            runInAction(()=>{
                this.doctorRegistry.set(doctor.id, doctor);
                this.selectedDoctor = doctor;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error) {
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

}