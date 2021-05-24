import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { patientUser } from "../models/user";

export default class profileStore {
    profile: patientUser | null = null;
    loadingProfile = false;

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
}