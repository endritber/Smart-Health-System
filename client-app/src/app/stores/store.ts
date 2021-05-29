import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import doctorStore from "./doctorStore";
import labResultStore from "./labResultStore";
import modalStore from "./modalStore";
import patientStore from "./patientStore";
import profileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    labResultStore: labResultStore
    userStore: UserStore
    commonStore: CommonStore
    modalStore: modalStore;
    profileStore: profileStore;
    patientStore: patientStore;
    doctorStore: doctorStore;
}

export const store: Store = {
    labResultStore: new labResultStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new modalStore(),
    profileStore: new profileStore(),
    patientStore: new patientStore(),
    doctorStore: new doctorStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}