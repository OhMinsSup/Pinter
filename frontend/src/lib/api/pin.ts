import axios from 'axios';

export const createSignedUrl = (file: any): Promise<any> => {
    console.log(file);
    
    const data = new FormData();
    data.append('file', file);
    return axios.post('/pin/create-signed-url', data, {
        headers: {
            'Content-Type': file.type
        },
        withCredentials: false,
    });
}

export type WritePinPayload = { relation_url: string, description: string, urls: string[], tags: string[] };

export const writePinAPI = ({ relation_url, description, urls, tags }: WritePinPayload): Promise<any> => axios.post('/pin', {
    relation_url, description, urls, tags
}); 

export const listPinAPI = (displayName?: string): Promise<any> => {
    if (!displayName) return axios.get('/pin/all/list');
    return axios.get(`/pin/${displayName}/list`);
} 

export const nextAPI = (next: string): Promise<any> => axios.get(next);
export const getPinAPI = (id: string): Promise<any> => axios.get(`/pin/${id}`);
export const likePinAPI = (id: string): Promise<any> => axios.post(`/pin/likes/${id}`);
export const unlikePinAPI = (id: string): Promise<any> => axios.delete(`/pin/likes/${id}`);
export const getlikePinAPI = (id: string): Promise<any> => axios.get(`/pin/likes/${id}`);
export const liksUserListAPI = (id: string): Promise<any> =>  axios.get(`/pin/likes/${id}/list`);
export const commentUserListAPI = (id: string): Promise<any> => axios.get(`/pin/comments/${id}/list`);
export const lockerUserListAPI = (id: string): Promise<any> => axios.get(`/pin/${id}/locker`);