import axios, { AxiosResponse } from 'axios';
import { LabResult } from '../models/labresult';
import { Prescription } from '../models/prescription';
import { patientUser, User, userFormValues } from '../models/user';


const sleep = (delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response =>{
   try {
        await sleep(1000); 
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody), 
    post: <T>(url: string, body : {}) => axios.post<T>(url, body).then(responseBody), 
    put: <T>(url: string, body : {}) => axios.put<T>(url, body).then(responseBody), 
    delete:<T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const labresults = {
    list: () => requests.get<LabResult[]>('/labresults'),
    details: (id: string) => requests.get<LabResult>(`/labresults/${id}`),
    create: (LabResult: LabResult)=>requests.post<void>('/labresults', LabResult),
    update: (LabResult: LabResult)=>axios.put<void>(`/labresults/${LabResult.id}`, LabResult),
    delete: (id: string)=>axios.delete<void>(`/labresults/${id}`)

}

const prescriptions = {
    list: () => requests.get<Prescription[]>('/prescriptions'),
    details: (id: string) => requests.get<Prescription>(`/prescriptions/${id}`),
    create: (Prescription: Prescription)=>axios.post<void>('/prescriptions', Prescription),
    update: (Prescription: Prescription)=>axios.put<void>(`/prescriptions/${Prescription.id}`, Prescription),
    delete: (id: string)=>axios.delete<void>(`/prescriptions/${id}`)

}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: userFormValues) => requests.post<User>('/account/login', user),
    register: (user: userFormValues) => requests.post<User>('/account/register', user)
}

const Profile = {
    get: (username:string) => requests.get<patientUser>(`/profiles/patient/${username}`)
}

const agent ={
    labresults,
    Account, 
    prescriptions,
    Profile
}

export default agent;