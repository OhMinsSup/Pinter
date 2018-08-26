import axios from 'axios';

export const createSignedUrl  = (file: any): Promise<any> => {
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

type WritePinPayload = {
    relation_url: string,
    body: string,
    urls: string[],
    tags: string[]
}

export const writePinAPI = ({ relation_url, body, urls, tags }: WritePinPayload): Promise<any> => axios.post('/pin', {
    relation_url, body, urls, tags 
});