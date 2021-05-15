import axios, { AxiosResponse } from 'axios';
import { LabResult } from '../models/labresult';


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

// axios.interceptors.request.use((config) => {
//     const token = window.localStorage.getItem('jwt');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// }, error => {
//     return Promise.reject(error);
// })

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
    create: (LabResult: LabResult)=>axios.post<void>('/labresults', LabResult),
    update: (LabResult: LabResult)=>axios.put<void>(`/labresults/${LabResult.id}`, LabResult),
    delete: (id: string)=>axios.delete<void>(`/labresults/${id}`)

}

const agent ={
    labresults
}

export default agent;