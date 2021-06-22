import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { Urinalysis } from "../models/urinalysis";


export default class urinalysisStore {

    urinalysisRegistry= new Map<string, Urinalysis>();
    selectedurinalysis:Urinalysis |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get urinalysisByName() {
        return Array.from(this.urinalysisRegistry.values()).sort((a,b)=> 
            Date.parse(a.date) - Date.parse(b.date)
        );
    }

    loadurinalysisList = async () => { 
        this.setLoadingInitial(true);
        try {
            const urinalysisList = await agent.urinalysis.list();    
                urinalysisList.forEach(urinalysis=> {
                urinalysis.date = urinalysis.date.split('T')[0];
                this.urinalysisRegistry.set(urinalysis.id, urinalysis)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadurinalysis = async(id:string)=> {
        let urinalysis = this.geturinalysis(id);
        if(urinalysis) {
            this.selectedurinalysis = urinalysis;
            return urinalysis;
        } else{
            this.loadingInitial=true;
            try {
                const urinalysisList = await agent.urinalysis.list();    
          
                urinalysis = await agent.urinalysis.details(id);
                this.seturinalysis(urinalysis);
                runInAction(()=>{
                    this.selectedurinalysis=urinalysis;
                })
                
                this.setLoadingInitial(false);
                return urinalysis;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private geturinalysis = (id: string) => {
        return this.urinalysisRegistry.get(id);
    }

    private seturinalysis = (urinalysis: Urinalysis) => {
        this.urinalysisRegistry.set(urinalysis.id, urinalysis);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selecturinalysis= (id: string)=> {
        this.selectedurinalysis = this.urinalysisRegistry.get(id);
    }

    cancelSelectedurinalysis = () => {
        this.selectedurinalysis = undefined;
    }

    openForm = (id?: string) => {
        id? this.selecturinalysis(id): this.cancelSelectedurinalysis();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createurinalysis= async (urinalysis:Urinalysis, patientId:string, doctorId: string) => {
        this.loading =true;
        urinalysis.id = uuid();
        try {
            await agent.urinalysis.create(urinalysis, patientId, doctorId);
            runInAction(()=> {
                this.urinalysisRegistry.set(urinalysis.id, urinalysis);
                this.selectedurinalysis = urinalysis;
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
    updateurinalysis= async(urinalysis:Urinalysis) => {
        this.loading =true;
        try {
            await agent.urinalysis.update(urinalysis);
            runInAction(()=> {
                this.urinalysisRegistry.set(urinalysis.id, urinalysis);
                this.selectedurinalysis = urinalysis;
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
    deleteurinalysis = async(id: string) => {
        this.loading = true;
        try {
            await agent.urinalysis.delete(id);
            runInAction(()=> {
                this.urinalysisRegistry.delete(id);
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
