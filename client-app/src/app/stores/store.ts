import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import labResultStore from "./labResultStore";
import modalStore from "./modalStore";
import profileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    labResultStore: labResultStore
    userStore: UserStore
    commonStore: CommonStore
    modalStore: modalStore;
    profileStore: profileStore;
}

export const store: Store = {
    labResultStore: new labResultStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new modalStore(),
    profileStore: new profileStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}