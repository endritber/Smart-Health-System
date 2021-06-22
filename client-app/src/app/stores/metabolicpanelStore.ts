import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { MetabolicPanel } from "../models/metabolicpanel";


export default class metabolicpanelStore {

    metabolicpanelRegistry= new Map<string, MetabolicPanel>();
    selectedMetabolicPanel:MetabolicPanel |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get metabolicpanelByDate() {
        return Array.from(this.metabolicpanelRegistry.values()).sort((a,b)=> 
            Date.parse(a.date) - Date.parse(b.date)
        );
    }

    loadMetabolicPanels = async () => { 
        this.setLoadingInitial(true);
        try {
            const metabolicpanels = await agent.metabolicpanel.list();    
                metabolicpanels.forEach(metabolicpanel=> {
                metabolicpanel.date = metabolicpanel.date.split('T')[0];
                this.metabolicpanelRegistry.set(metabolicpanel.id, metabolicpanel)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadmetabolicpanel = async(id:string)=> {
        let metabolicpanel = this.getmetabolicpanel(id);
        if(metabolicpanel) {
            this.selectedMetabolicPanel = metabolicpanel;
            return metabolicpanel;
        } else{
            this.loadingInitial=true;
            try {
                metabolicpanel = await agent.metabolicpanel.details(id);
                this.setmetabolicpanel(metabolicpanel);
                runInAction(()=>{
                    this.selectedMetabolicPanel=metabolicpanel;
                })
                this.setLoadingInitial(false);
                return metabolicpanel;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getmetabolicpanel = (id: string) => {
        return this.metabolicpanelRegistry.get(id);
    }

    private setmetabolicpanel = (metabolicpanel: MetabolicPanel) => {
        this.metabolicpanelRegistry.set(metabolicpanel.id, metabolicpanel);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectmetabolicpanel= (id: string)=> {
        this.selectedMetabolicPanel = this.metabolicpanelRegistry.get(id);
    }

    cancelSelectedmetabolicpanel = () => {
        this.selectedMetabolicPanel = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectmetabolicpanel(id): this.cancelSelectedmetabolicpanel();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createmetabolicpanel= async (metabolicpanel:MetabolicPanel, patientId:string, doctorId: string) => {
        this.loading =true;
        metabolicpanel.id = uuid();
        try {
            await agent.metabolicpanel.create(metabolicpanel, patientId, doctorId);
            runInAction(()=> {
                this.metabolicpanelRegistry.set(metabolicpanel.id, metabolicpanel);
                this.selectedMetabolicPanel = metabolicpanel;
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
    updatemetabolicpanel= async(metabolicpanel:MetabolicPanel) => {
        this.loading =true;
        try {
            await agent.metabolicpanel.update(metabolicpanel);
            runInAction(()=> {
                this.metabolicpanelRegistry.set(metabolicpanel.id, metabolicpanel);
                this.selectedMetabolicPanel = metabolicpanel;
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
    deletemetabolicpanel = async(id: string) => {
        this.loading = true;
        try {
            await agent.metabolicpanel.delete(id);
            runInAction(()=> {
                this.metabolicpanelRegistry.delete(id);
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
