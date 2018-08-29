import axios from 'axios';

export const listPinAPI = (displayName?: string): Promise<any> => {
    if (!displayName) return axios.get('/pin/all/list');
    return axios.get(`/pin/${displayName}/list`);
} 

export const nextAPI = (next: string): Promise<any> => axios.get(next);
