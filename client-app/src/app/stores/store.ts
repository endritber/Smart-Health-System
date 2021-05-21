import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import labResultStore from "./labResultStore";
import modalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    labResultStore: labResultStore
    userStore: UserStore
    commonStore: CommonStore
    modalStore: modalStore;
}

export const store: Store = {
    labResultStore: new labResultStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new modalStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}