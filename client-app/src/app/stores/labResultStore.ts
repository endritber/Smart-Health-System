import { makeAutoObservable} from "mobx";

export default class labResultStore {
    constructor() {
        makeAutoObservable(this);
    }

}
