import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";


export default class labResultStore {
    constructor() {
        makeAutoObservable(this);
    }

}
