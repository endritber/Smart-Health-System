import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, userFormValues } from "../models/user";
import { store } from "./store";





export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login =  async (creds:userFormValues)=>{

        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=> this.user = user);

            if (user.roleId===1) { 
                history.push(`/profiles/${user.userName}/${user.id}`);
            } else if (user.roleId === 2) {
                history.push(`/myPatients/${user.id}`);
            } 
            store.modalStore.closeModal();
            
            
        } catch(error) {
            throw error;
        }
    }
    logout = ()=> {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user=null;
        history.push('/');
    }

    getUser = async ()=> {
        try {
            const user = await agent.Account.current();
            runInAction(()=>this.user = user);

        } catch(error) {
            console.log(error);
        }
    }
}

//     logout = ()=> {
//         store.commonStore.setToken(null);
//         window.localStorage.removeItem('jwt');
//         this.user=null;
//         history.push('/');
//     }

//     getUser = async ()=> {
//         try {
//             const user = await agent.Account.current();
//             runInAction(()=>this.user = user);

//         } catch(error) {
//             console.log(error);
//         }
//     }

//     register =  async (creds:UserFormValues)=>{

//         try {
//             const user = await agent.Account.register(creds);
//             store.commonStore.setToken(user.token);
//             runInAction(()=>this.user=user);
//             history.push('/activities');
//             store.modalStore.closeModel();
            
//         } catch(error) {
//             throw error;
//         }
//     }
// }