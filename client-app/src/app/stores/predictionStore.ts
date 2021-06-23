import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Symptoms } from "../models/symptoms";



export default class predictionStore {
    
    predictionsRegistry= new Map<number, Symptoms>();
    selectedPrediction: Symptoms | undefined;
    loading=false;
    loadingInitial = false;
    

    constructor() {
        makeAutoObservable(this);
    }


    loadPredictions = async () => { 
        this.setLoadingInitial(true);
        try {
            const predictions = await agent.prediction.list();    
                predictions.forEach(prediction=> {
                this.predictionsRegistry.set(prediction.id, prediction)
            })
            this.setLoadingInitial(false);
        }catch(error) {
            console.log(error);    
         this.setLoadingInitial(false);
        }



    }


    loadPrediction = async(id:number)=> {
        let prediction = this.getPrediction(id);
        if(prediction) {
            this.selectedPrediction = prediction;
            return prediction;
        } else{
            this.loadingInitial=true;
            try {
                prediction = await agent.prediction.details(id);
                this.setPrescription(prediction);
                runInAction(()=>{
                    this.selectedPrediction=prediction;
                })
                this.setLoadingInitial(false);
                return prediction;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getPrediction = (id: number) => {
        return this.predictionsRegistry.get(id);
    }

    private setPrescription = (prediction: Symptoms) => {
        this.predictionsRegistry.set(prediction.id, prediction);
    }
 



    setLoadingInitial  = (state:boolean) => {
        this.loadingInitial = state;
    }


    createPrediction= async (prediction:Symptoms, patientId:string) => {
        this.loading =true;
        try {
            await agent.prediction.create(prediction, patientId);
            runInAction(()=> {
                this.predictionsRegistry.set(prediction.id, prediction);
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction (()=> {
                this.loading = false;
            })
        }

    }

    deletePrediction = async(id: number) => {
        this.loading = true;
        try {
            await agent.prediction.delete(id);
            runInAction(()=> {
                this.predictionsRegistry.delete(id);
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
