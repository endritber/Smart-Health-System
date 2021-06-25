import SizeContext from "antd/lib/config-provider/SizeContext";
import { makeAutoObservable } from "mobx"

interface Modal {
    open:boolean;
    body: JSX.Element | null;
    size:"mini" | "tiny" | "small" | "large" | "fullscreen" | undefined;
}

export default class modalStore {
    modal: Modal = {
        open:false,
        body:null,
        size:undefined
    }

    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: JSX.Element, size:"mini" | "tiny" | "small" | "large" | "fullscreen" | undefined) => {
        this.modal.open = true;
        this.modal.body = content;
        this.modal.size = size

    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body= null;
        this.modal.size = undefined;
    }
}