
export interface User {

    id:string

    userName: string;

    token: string;

    displayName: string;

    image?: string;

    roleId:number;

}

export interface userFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

export interface patientUser {
    id: string
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

}
export interface doctorUser {
    id: string;
    displayName:string;
    userName:string;
    name: string;
    lastName:string;
    education:string;
    yearsExperience:number;
    specialization:string;
    qualification:string;
    birthDate:string;
    gender:string;
    bio:string;
    image:string
}