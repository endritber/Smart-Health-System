import { patientUser, User } from "./user";

export interface patientprofile {
    id:string;
    displayName: string;
    userName: string;
    name: string;
    lastName: string;
    birthDate: string;
    address:string;
    language:string;
    profession:string;
    bio:string;
    image:string;
    city :string
    area:string
    information :string
    number :string
    bloodGroup:string 
    
}

export class patientprofile implements patientprofile {
    constructor(user: patientUser) {
        this.id = user.id;
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
        this.name = user.name;
        this.lastName = user.lastName;
        this.birthDate = user.birthDate;
        this.address = user.address;
        this.language = user.language;
        this.profession = user.profession;
        this.bio = user.bio;
        this.image = user.image;
        this.city = user.city;
        this.area = user.area;
        this.information = user.information;
        this.bloodGroup = user.bloodGroup;
        this.number = user.number;
    }
}