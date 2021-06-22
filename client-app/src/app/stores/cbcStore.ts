import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { CBC } from "../models/cbc";


export default class cbcStore {

    cbcRegistry= new Map<string, CBC>();
    selectedCBC:CBC |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get cbcByDate() {
        return Array.from(this.cbcRegistry.values()).sort((a,b)=> 
            Date.parse(a.date) - Date.parse(b.date)
        );
    }

    loadcbcs = async () => { 
        this.setLoadingInitial(true);
        try {
            const cbc = await agent.cbc.list();    
                cbc.forEach(cbc=> {
                cbc.date = cbc.date.split('T')[0];
                this.cbcRegistry.set(cbc.id, cbc)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadcbc = async(id:string)=> {
        let cbc = this.getcbc(id);
        if(cbc) {
            this.selectedCBC = cbc;
            return cbc;
        } else{
            this.loadingInitial=true;
            try {
                cbc = await agent.cbc.details(id);
                this.setcbc(cbc);
                runInAction(()=>{
                    this.selectedCBC=cbc;
                })
                this.setLoadingInitial(false);
                return cbc;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getcbc = (id: string) => {
        return this.cbcRegistry.get(id);
    }

    private setcbc = (cbc: CBC) => {
        this.cbcRegistry.set(cbc.id, cbc);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectcbc= (id: string)=> {
        this.selectedCBC = this.cbcRegistry.get(id);
    }

    cancelSelectedcbc = () => {
        this.selectedCBC = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectcbc(id): this.cancelSelectedcbc();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createcbc= async (cbc:CBC, patientId:string, doctorId: string) => {
        this.loading =true;
        cbc.id = uuid();
        try {
            await agent.cbc.create(cbc, patientId, doctorId);
            runInAction(()=> {
                this.cbcRegistry.set(cbc.id, cbc);
                this.selectedCBC = cbc;
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
    updatecbc= async(cbc:CBC) => {
        this.loading =true;
        try {
            await agent.cbc.update(cbc);
            runInAction(()=> {
                this.cbcRegistry.set(cbc.id, cbc);
                this.selectedCBC = cbc;
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
    deletecbc = async(id: string) => {
        this.loading = true;
        try {
            await agent.cbc.delete(id);
            runInAction(()=> {
                this.cbcRegistry.delete(id);
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
