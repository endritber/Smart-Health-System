import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Prescription } from "../models/prescription";
import { Weight } from "../models/weight";


export default class weightStore {

    weightRegistry= new Map<string, Weight>();
    selectedWeight:Weight |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadWeights = async () => { 
        this.setLoadingInitial(true);
        try {
            const weights = await agent.Weights.list();    
                weights.forEach(weight=> {
                weight.date = weight.date.split("T")[0];
                this.weightRegistry.set(weight.weightId, weight)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadWeight = async(id:string)=> {
        let weight = this.getWeight(id);
        if(weight) {
            this.selectedWeight = weight;
            return weight;
        } else{
            this.loadingInitial=true;
            try {
                weight = await agent.Weights.details(id);
                this.setWeight(weight);
                runInAction(()=>{
                    this.selectedWeight=weight;
                })
                this.setLoadingInitial(false);
                return weight;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getWeight = (id: string) => {
        return this.weightRegistry.get(id);
    }

    private setWeight = (weight: Weight) => {
        this.weightRegistry.set(weight.weightId, weight);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectWeight= (id: string)=> {
        this.selectedWeight = this.weightRegistry.get(id);
    }

    createWeight= async (weight :Weight, patientId:string) => {
        this.loading =true;
        weight.weightId = uuid();
        try {
            await agent.Weights.create(weight, patientId);
            runInAction(()=> {
                this.weightRegistry.set(weight.weightId, weight);
                this.selectedWeight = weight;
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
    updateWeight= async(weight :Weight) => {
        this.loading =true;
        try {
            await agent.Weights.update(weight);
            runInAction(()=> {
                this.weightRegistry.set(weight.weightId, weight);
                this.selectedWeight = weight;
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
    deleteWeight = async(id: string) => {
        this.loading = true;
        try {
            await agent.Weights.delete(id);
            runInAction(()=> {
                this.weightRegistry.delete(id);
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
