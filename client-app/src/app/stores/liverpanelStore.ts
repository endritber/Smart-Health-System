import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from'uuid';
import { Patient } from "../models/patient";
import { Doctor } from "../models/doctor";
import { LiverPanel } from "../models/liverpanel";


export default class liverpanelStore {

    liverpanelRegistry= new Map<string, LiverPanel>();
    selectedLiverPanel:LiverPanel |undefined = undefined;
    editMode =false;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get liverpanelByDate() {
        return Array.from(this.liverpanelRegistry.values()).sort((a,b)=> 
            Date.parse(a.date) - Date.parse(b.date)
        );
    }

    loadliverpanels = async () => { 
        this.setLoadingInitial(true);
        try {
            const liverpanels = await agent.liverpanel.list();    
                liverpanels.forEach(LiverPanel=> {
                LiverPanel.date = LiverPanel.date.split('T')[0];
                this.liverpanelRegistry.set(LiverPanel.id, LiverPanel)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }

    loadLiverPanel = async(id:string)=> {
        let LiverPanel = this.getLiverPanel(id);
        if(LiverPanel) {
            this.selectedLiverPanel = LiverPanel;
            return LiverPanel;
        } else{
            this.loadingInitial=true;
            try {
                LiverPanel = await agent.liverpanel.details(id);
                this.setLiverPanel(LiverPanel);
                runInAction(()=>{
                    this.selectedLiverPanel=LiverPanel;
                })
                this.setLoadingInitial(false);
                return LiverPanel;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getLiverPanel = (id: string) => {
        return this.liverpanelRegistry.get(id);
    }

    private setLiverPanel = (LiverPanel: LiverPanel) => {
        this.liverpanelRegistry.set(LiverPanel.id, LiverPanel);
    }

    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }

    selectLiverPanel= (id: string)=> {
        this.selectedLiverPanel = this.liverpanelRegistry.get(id);
    }

    cancelSelectedLiverPanel = () => {
        this.selectedLiverPanel = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectLiverPanel(id): this.cancelSelectedLiverPanel();
        this.editMode = true;
    }

    closeForm = ()=> {
        this.editMode = false;
    }

    createLiverPanel= async (LiverPanel:LiverPanel, patientId:string, doctorId: string) => {
        this.loading =true;
        LiverPanel.id = uuid();
        try {
            await agent.liverpanel.create(LiverPanel, patientId, doctorId);
            runInAction(()=> {
                this.liverpanelRegistry.set(LiverPanel.id, LiverPanel);
                this.selectedLiverPanel = LiverPanel;
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
    updateLiverPanel= async(LiverPanel:LiverPanel) => {
        this.loading =true;
        try {
            await agent.liverpanel.update(LiverPanel);
            runInAction(()=> {
                this.liverpanelRegistry.set(LiverPanel.id, LiverPanel);
                this.selectedLiverPanel = LiverPanel;
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
    deleteLiverPanel = async(id: string) => {
        this.loading = true;
        try {
            await agent.liverpanel.delete(id);
            runInAction(()=> {
                this.liverpanelRegistry.delete(id);
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
