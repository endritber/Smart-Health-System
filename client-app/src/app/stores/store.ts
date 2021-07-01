import { createContext, useContext } from "react";
import allergyStore from "./allergyStore";
import cbcStore from "./cbcStore";
import CommonStore from "./commonStore";
import doctorStore from "./doctorStore";
import liverpanelStore from "./liverpanelStore";
import metabolicpanelStore from "./metabolicpanelStore";
import modalStore from "./modalStore";
import patientStore from "./patientStore";
import predictionStore from "./predictionStore";
import prescriptionStore from "./prescriptionStore";
import profileStore from "./profileStore";
import urinalysisStore from "./urinalysisStore";
import UserStore from "./userStore";
import weightStore from "./weightStore";

interface Store {
    userStore: UserStore
    commonStore: CommonStore
    modalStore: modalStore;
    profileStore: profileStore;
    patientStore: patientStore;
    doctorStore: doctorStore;
    prescriptionStore: prescriptionStore;
    allergyStore: allergyStore;
    cbcStore: cbcStore;
    liverpanelStore: liverpanelStore;
    metabolicpanelStore: metabolicpanelStore;
    urinalysisStore: urinalysisStore;
    predictionStore: predictionStore;
    weightStore : weightStore;
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new modalStore(),
    profileStore: new profileStore(),
    patientStore: new patientStore(),
    doctorStore: new doctorStore(),
    prescriptionStore: new prescriptionStore(),
    allergyStore: new allergyStore(),
    cbcStore: new cbcStore(),
    liverpanelStore: new liverpanelStore(),
    metabolicpanelStore: new metabolicpanelStore(),
    urinalysisStore:new  urinalysisStore(),
    predictionStore : new predictionStore(),
    weightStore : new weightStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}