import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Allergy } from "../models/allergy";


export default class allergyStore {

    allergyRegistry= new Map<string, Allergy>();
    selectedAllergy:Allergy |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadAllergies = async () => { 
        this.setLoadingInitial(true);
        try {
            const allergies = await agent.allergies.list();    
                allergies.forEach(allergy=> {
                this.allergyRegistry.set(allergy.id, allergy)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadAllergy = async(id:string)=> {
        let allergy = this.getAllergy(id);
        if(allergy) {
            this.selectedAllergy = allergy;
            return allergy;
        } else{
            this.loadingInitial=true;
            try {
                allergy = await agent.allergies.details(id);
                this.setAllergy(allergy);
                runInAction(()=>{
                    this.selectedAllergy=allergy;
                })
                this.setLoadingInitial(false);
                return allergy;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getAllergy = (id: string) => {
        return this.allergyRegistry.get(id);
    }

    private setAllergy = (allergy: Allergy) => {
        this.allergyRegistry.set(allergy.id, allergy);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectAllergy= (id: string)=> {
        this.selectedAllergy = this.allergyRegistry.get(id);
    }

    cancelSelectedAllergy = () => {
        this.selectedAllergy = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectAllergy(id): this.cancelSelectedAllergy();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createAllergy= async (allergy:Allergy, patientId:string, doctorId: string) => {
        this.loading =true;
        allergy.id = uuid();
        try {
            await agent.allergies.create(allergy, patientId, doctorId);
            runInAction(()=> {
                this.allergyRegistry.set(allergy.id, allergy);
                this.selectedAllergy = allergy;
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
    updateAllergy= async(allergy:Allergy) => {
        this.loading =true;
        try {
            await agent.allergies.update(allergy);
            runInAction(()=> {
                this.allergyRegistry.set(allergy.id, allergy);
                this.selectedAllergy = allergy;
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
    deleteAllergy = async(id: string) => {
        this.loading = true;
        try {
            await agent.allergies.delete(id);
            runInAction(()=> {
                this.allergyRegistry.delete(id);
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
