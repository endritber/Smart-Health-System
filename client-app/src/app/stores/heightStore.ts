import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Prescription } from "../models/prescription";
import { Height } from "../models/height";


export default class heightStore {

    heightRegistry= new Map<string, Height>();
    selectedHeight:Height |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadHeights = async () => { 
        this.setLoadingInitial(true);
        try {
            const heights = await agent.Heights.list();    
                heights.forEach(height=> {
                height.date = height.date.split("T")[0];
                this.heightRegistry.set(height.heightId, height)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadHeight = async(id:string)=> {
        let height = this.getHeight(id);
        if(height) {
            this.selectedHeight = height;
            return height;
        } else{
            this.loadingInitial=true;
            try {
                height = await agent.Heights.details(id);
                this.setHeight(height);
                runInAction(()=>{
                    this.selectedHeight=height;
                })
                this.setLoadingInitial(false);
                return height;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getHeight = (id: string) => {
        return this.heightRegistry.get(id);
    }

    private setHeight = (height: Height) => {
        this.heightRegistry.set(height.heightId, height);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectHeight= (id: string)=> {
        this.selectedHeight = this.heightRegistry.get(id);
    }

    createHeight= async (height :Height, patientId:string) => {
        this.loading =true;
        height.heightId = uuid();
        try {
            await agent.Heights.create(height, patientId);
            runInAction(()=> {
                this.heightRegistry.set(height.heightId, height);
                this.selectedHeight = height;
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
    updateHeight= async(height :Height) => {
        this.loading =true;
        try {
            await agent.Heights.update(height);
            runInAction(()=> {
                this.heightRegistry.set(height.heightId, height);
                this.selectedHeight = height;
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
    deleteHeight = async(id: string) => {
        this.loading = true;
        try {
            await agent.Heights.delete(id);
            runInAction(()=> {
                this.heightRegistry.delete(id);
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
