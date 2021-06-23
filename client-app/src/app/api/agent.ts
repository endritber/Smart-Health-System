import axios, { AxiosResponse } from 'axios';
import { Allergy } from '../models/allergy';
import { CBC } from '../models/cbc';
import { Doctor } from '../models/doctor';
import { LiverPanel } from '../models/liverpanel';
import { MetabolicPanel } from '../models/metabolicpanel';
import { Patient } from '../models/patient';
import { patientprofile } from '../models/patientprofile';
import { Prescription } from '../models/prescription';
import { Symptoms } from '../models/symptoms';
import { Urinalysis } from '../models/urinalysis';
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

const symRequests = {
    get: <T> (sym: string) => axios.get<T>("http://localhost:8080").then(responseBody), 
    post: <T>(sym: string, body : {}) => axios.post<T>("http://localhost:8080", body).then(responseBody), 
    delete:<T>(sym: string) => axios.delete<T>("http://localhost:8080").then(responseBody),
}

const liverpanel = {
    list: () => requests.get<LiverPanel[]>('/liverpanel'),
    details: (id: string) => requests.get<LiverPanel>(`/liverpanel/${id}`),
    create: (LiverPanel: LiverPanel, patientId: string, doctorId:string)=>requests.post<void>(`/liverpanel/${patientId}/${doctorId}`,LiverPanel),
    update: (LiverPanel: LiverPanel)=>axios.put<void>(`/liverpanel/${LiverPanel.id}`, LiverPanel),
    delete: (id: string)=>axios.delete<void>(`/liverpanel/${id}`)
}

const prediction = {
    list: () => symRequests.get<Symptoms[]>('/getPredictions'),
    details: (id: number) => symRequests.get<Symptoms>(`/getPrediction/${id}`),
    create: (Symptom: Symptoms, patientId: string)=>symRequests.post<void>(`/addPrediction/${patientId}`,Symptom),
    delete: (id: number)=>symRequests.delete<void>(`/delete/${id}`)

}

const metabolicpanel = {
    list: () => requests.get<MetabolicPanel[]>('/metabolicpanel'),
    details: (id: string) => requests.get<MetabolicPanel>(`/metabolicpanel/${id}`),
    create: (MetabolicPanel: MetabolicPanel, patientId: string, doctorId:string)=>requests.post<void>(`/metabolicpanel/${patientId}/${doctorId}`,MetabolicPanel),
    update: (MetabolicPanel: MetabolicPanel)=>axios.put<void>(`/metabolicpanel/${MetabolicPanel.id}`, MetabolicPanel),
    delete: (id: string)=>axios.delete<void>(`/metabolicpanel/${id}`)

}

const cbc = {
    list: () => requests.get<CBC[]>('/cbc'),
    details: (id: string) => requests.get<CBC>(`/cbc/${id}`),
    create: (CBC: CBC, patientId: string, doctorId:string)=>requests.post<void>(`/cbc/${patientId}/${doctorId}`,CBC),
    update: (CBC: CBC)=>axios.put<void>(`/cbc/${CBC.id}`, CBC),
    delete: (id: string)=>axios.delete<void>(`/cbc/${id}`)

}

const urinalysis = {
    list: () => requests.get<Urinalysis[]>('/urinalysis'),
    details: (id: string) => requests.get<Urinalysis>(`/urinalysis/${id}`),
    create: (Urinalysis: Urinalysis, patientId: string, doctorId:string)=>requests.post<void>(`/urinalysis/${patientId}/${doctorId}`,Urinalysis),
    update: (Urinalysis: Urinalysis)=>axios.put<void>(`/urinalysis/${Urinalysis.id}`, Urinalysis),
    delete: (id: string)=>axios.delete<void>(`/urinalysis/${id}`)

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

    Account, 
    prescriptions,
    Profile,
    Patients,
    Doctors, 
    DocProfile,
    allergies,
    cbc,
    metabolicpanel,
    liverpanel,
    urinalysis,
    prediction
}

export default agent;