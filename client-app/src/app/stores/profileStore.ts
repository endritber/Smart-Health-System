import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { doctorUser, patientUser } from "../models/user";


export default class profileStore {
    profiles: patientUser[] = [];
    profile: patientUser | null = null;

    doctor: doctorUser | null = null;

    loadingProfile = false;
    loading=false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile = async (username: string) =>{
        this.loadingProfile=true;
        try {
            const profile = await agent.Profile.get(username);
            runInAction(()=> {
            this.profile=profile
            this.loadingProfile=false})
        }catch(error) {
            console.log(error);
            runInAction(()=> this.loadingProfile=false)
        }
    }
    

    loadDocProfile = async (username: string) =>{
        this.loadingProfile=true;
        try {
            const doctor = await agent.DocProfile.get(username);
            runInAction(()=> {
            this.doctor=doctor;
            this.loadingProfile=false})
        }catch(error) {
            console.log(error);
            runInAction(()=> this.loadingProfile=false)
        }
    }
}