export interface User {

    username: string;

    token: string;

    displayName: string;

    image?: string;

    roleId:number;

}

export interface userFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}