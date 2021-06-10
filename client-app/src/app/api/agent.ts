import axios, { AxiosResponse } from 'axios';
import { Allergy } from '../models/allergy';
import { Doctor } from '../models/doctor';
import { LabResult } from '../models/labresult';
import { Patient } from '../models/patient';
import { patientprofile } from '../models/patientprofile';
import { Prescription } from '../models/prescription';
import {doctorUser, patientUser, User, userFormValues } from '../models/user';


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
    create: (LabResult: LabResult, patientId: string, doctorId:string)=>requests.post<void>(`/labresults/${patientId}/${doctorId}`,LabResult),
    update: (LabResult: LabResult)=>axios.put<void>(`/labresults/${LabResult.id}`, LabResult),
    delete: (id: string)=>axios.delete<void>(`/labresults/${id}`)

}
const allergies = {
    list: () => requests.get<Allergy[]>('/allergy'),
    details: (id: string) => requests.get<Allergy>(`/allergy/${id}`),
    create: (Allergy: Allergy, patientId: string, doctorId:string)=>requests.post<void>(`/allergy/${patientId}/${doctorId}`,Allergy),
    update: (Allergy: Allergy)=>axios.put<void>(`/allergy/${Allergy.id}`, Allergy),
    delete: (id: string)=>axios.delete<void>(`/allergy/${id}`)

}

const prescriptions = {
    list: () => requests.get<Prescription[]>('/prescriptions'),
    details: (id: string) => requests.get<Prescription>(`/prescriptions/${id}`),
    create: (Prescription: Prescription, patientId: string, doctorId: string)=>axios.post<void>(`/prescriptions/${patientId}/${doctorId}`, Prescription),
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

const DocProfile = {
    get: (username:string) => requests.get<doctorUser>(`/profiles/doctor/${username}`)
}

const Patients = {

    list: () => requests.get<Patient[]>('/patient'),
    details: (id: string) => requests.get<Patient>(`/patient/${id}`),
    update: (patient: Patient) => axios.put<void>(`/patient/${patient.id}`, patient),
    delete:(id:string) => axios.delete<void>(`/patient/${id}`),
    addDoctor:(patientId: string, doctorId:string) => axios.put<void>(`/patient/${patientId}/doctor/${doctorId}`)
}

const Doctors = {
    list: () => requests.get<Doctor[]>('/doctor'),
    details: (id: string) => requests.get<Doctor>(`/doctor/${id}`),
    update: (doctor: Doctor) => axios.put<void>(`/doctor/${doctor.id}`, doctor),
    delete:(id:string) => axios.delete<void>(`/doctor/${id}`),
    
}

const agent ={
    labresults,
    Account, 
    prescriptions,
    Profile,
    Patients,
    Doctors, 
    DocProfile,
    allergies
}

export default agent;