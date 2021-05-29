import { StringifyOptions } from "node:querystring";
import { doctorUser, patientUser, User } from "./user";

export interface doctorprofile {
    id: string;
    userName:string;
    displayName:string;
    name: string;
    lastName:string;
    education:string;
    yearsExperience:number;
    specialization:string;
    qualification:string;
    birthDate:string;
    gender:string;
    bio:string;
    image:string;
    
}

export class doctorprofile implements doctorprofile {
    constructor(user: doctorUser) {
        this.id = user.id;
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
        this.name = user.name;
        this.lastName = user.lastName;
        this.birthDate = user.birthDate;
        this.education = user.education;
        this.yearsExperience = user.yearsExperience;
        this.specialization= user.specialization;
        this.qualification = user.qualification
        this.gender = user.gender
        this.bio = user.bio;
        this.image = user.image;
    }
}