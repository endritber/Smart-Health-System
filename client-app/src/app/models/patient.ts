import { Profile } from "./profile";

export interface Patient {
    id: string;
    name:string;
    lastName:string;
    birthDate: string;
    nationality:string;
    allergies: string;
    profession: string;
    disease: string;
    hostUser?: string;
    user?:Profile;

}