import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { LabResult } from "../models/labresult";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";


export default class labResultStore {

    labresultsRegistry= new Map<string, LabResult>();
    selectedLabResult:LabResult |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get LabResultsByName() {
        return Array.from(this.labresultsRegistry.values()).sort((a,b)=> 
            Date.parse(a.date) - Date.parse(b.date)
        );
    }

    loadLabResults = async () => { 
        this.setLoadingInitial(true);
        try {
            const labresults = await agent.labresults.list();    
                labresults.forEach(labresult=> {
                labresult.date = labresult.date.split('T')[0];
                this.labresultsRegistry.set(labresult.id, labresult)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectLabResult= (id: string)=> {
        this.selectedLabResult = this.labresultsRegistry.get(id);
    }

    cancelSelectedLabResult = () => {
        this.selectedLabResult = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectLabResult(id): this.cancelSelectedLabResult();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createLabResult= async (labresult:LabResult, patient:Patient, doctor: Doctor) => {
        this.loading =true;
        labresult.id = uuid();
        try {
            await agent.labresults.create(labresult, patient.id, doctor.id);
            runInAction(()=> {
                this.labresultsRegistry.set(labresult.id, labresult);
                this.selectedLabResult = labresult;
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
    updateLabResult= async(labresult:LabResult) => {
        this.loading =true;
        try {
            await agent.labresults.update(labresult);
            runInAction(()=> {
                this.labresultsRegistry.set(labresult.id, labresult);
                this.selectedLabResult = labresult;
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

    deleteLabResult = async(id: string) => {
        this.loading = true;
        try {
            await agent.labresults.delete(id);
            runInAction(()=> {
                this.labresultsRegistry.delete(id);
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
