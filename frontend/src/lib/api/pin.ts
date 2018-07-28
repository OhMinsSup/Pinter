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