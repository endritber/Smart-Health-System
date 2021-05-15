import { createContext, useContext } from "react";
import labResultStore from "./labResultStore";

interface Store {
    labResultStore: labResultStore
}

export const store: Store = {
    labResultStore: new labResultStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}