import axios from 'axios';

export const listPinAPI = (displayName?: string): Promise<any> => {
    if (!displayName) return axios.get('/pin/');
    return axios.get(`/pin/${displayName}/user`);
} 

export const nextAPI = (next: string): Promise<any> => axios.get(next);
