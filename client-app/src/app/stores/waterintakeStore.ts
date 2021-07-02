import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Prescription } from "../models/prescription";
import { Weight } from "../models/weight";
import { WaterIntake } from "../models/waterintake";


export default class WaterIntakeStore {

    WaterIntakeRegistry= new Map<string, WaterIntake>();
    selectedWaterIntake:WaterIntake |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadWaterIntakes = async () => { 
        this.setLoadingInitial(true);
        try {
            const WaterIntakes = await agent.WaterIntakes.list();    
                WaterIntakes.forEach(WaterIntake=> {
                WaterIntake.date = WaterIntake.date.split("T")[0];
                this.WaterIntakeRegistry.set(WaterIntake.waterintakeId, WaterIntake)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadWaterIntake = async(id:string)=> {
        let WaterIntake = this.getWaterIntake(id);
        if(WaterIntake) {
            this.selectedWaterIntake = WaterIntake;
            return WaterIntake;
        } else{
            this.loadingInitial=true;
            try {
                WaterIntake = await agent.WaterIntakes.details(id);
                this.setWaterIntake(WaterIntake);
                runInAction(()=>{
                    this.selectedWaterIntake=WaterIntake;
                })
                this.setLoadingInitial(false);
                return WaterIntake;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getWaterIntake = (id: string) => {
        return this.WaterIntakeRegistry.get(id);
    }

    private setWaterIntake = (WaterIntake: WaterIntake) => {
        this.WaterIntakeRegistry.set(WaterIntake.waterintakeId, WaterIntake);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectWaterIntake= (id: string)=> {
        this.selectedWaterIntake = this.WaterIntakeRegistry.get(id);
    }

    createWaterIntake= async (WaterIntake :WaterIntake, patientId:string) => {
        this.loading =true;
        WaterIntake.waterintakeId = uuid();
        try {
            await agent.WaterIntakes.create(WaterIntake, patientId);
            runInAction(()=> {
                this.WaterIntakeRegistry.set(WaterIntake.waterintakeId, WaterIntake);
                this.selectedWaterIntake = WaterIntake;
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
    updateWaterIntake= async(WaterIntake :WaterIntake) => {
        this.loading =true;
        try {
            await agent.WaterIntakes.update(WaterIntake);
            runInAction(()=> {
                this.WaterIntakeRegistry.set(WaterIntake.waterintakeId, WaterIntake);
                this.selectedWaterIntake = WaterIntake;
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
    deleteWaterIntake = async(id: string) => {
        this.loading = true;
        try {
            await agent.WaterIntakes.delete(id);
            runInAction(()=> {
                this.WaterIntakeRegistry.delete(id);
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
