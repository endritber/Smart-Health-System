export interface User {

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