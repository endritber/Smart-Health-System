import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import labResultStore from "./labResultStore";
import modalStore from "./modalStore";
import patientStore from "./patientStore";
import UserStore from "./userStore";

interface Store {
    labResultStore: labResultStore
    userStore: UserStore
    commonStore: CommonStore
    modalStore: modalStore
    patientStore: patientStore
}

export const store: Store = {
    labResultStore: new labResultStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new modalStore(),
    patientStore: new patientStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}