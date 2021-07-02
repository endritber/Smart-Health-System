import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Prescription } from "../models/prescription";
import { Weight } from "../models/weight";
import { Waterintake } from "../models/waterintake";


export default class waterintakeStore {

    waterintakeRegistry= new Map<string, Waterintake>();
    selectedWaterintake:Waterintake |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadWaterintakes = async () => { 
        this.setLoadingInitial(true);
        try {
            const waterintakes = await agent.WaterIntakes.list();    
                waterintakes.forEach(waterintake=> {
                waterintake.date = waterintake.date.split("T")[0];
                this.waterintakeRegistry.set(waterintake.waterintakeId, waterintake)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadWaterintake = async(id:string)=> {
        let waterintake = this.getWaterintake(id);
        if(waterintake) {
            this.selectedWaterintake = waterintake;
            return waterintake;
        } else{
            this.loadingInitial=true;
            try {
                waterintake = await agent.WaterIntakes.details(id);
                this.setWaterintake(waterintake);
                runInAction(()=>{
                    this.selectedWaterintake=waterintake;
                })
                this.setLoadingInitial(false);
                return waterintake;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getWaterintake = (id: string) => {
        return this.waterintakeRegistry.get(id);
    }

    private setWaterintake = (waterintake: Waterintake) => {
        this.waterintakeRegistry.set(waterintake.waterintakeId, waterintake);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectWaterintake= (id: string)=> {
        this.selectedWaterintake = this.waterintakeRegistry.get(id);
    }

    createWaterintake= async (waterintake :Waterintake, patientId:string) => {
        this.loading =true;
        waterintake.waterintakeId = uuid();
        try {
            await agent.WaterIntakes.create(waterintake, patientId);
            runInAction(()=> {
                this.waterintakeRegistry.set(waterintake.waterintakeId, waterintake);
                this.selectedWaterintake = waterintake;
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
    updateWaterintake= async(waterintake :Waterintake) => {
        this.loading =true;
        try {
            await agent.WaterIntakes.update(waterintake);
            runInAction(()=> {
                this.waterintakeRegistry.set(waterintake.waterintakeId, waterintake);
                this.selectedWaterintake = waterintake;
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
    deleteWaterintake = async(id: string) => {
        this.loading = true;
        try {
            await agent.WaterIntakes.delete(id);
            runInAction(()=> {
                this.waterintakeRegistry.delete(id);
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
