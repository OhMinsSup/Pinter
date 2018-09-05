import axios from 'axios';

export const createSignedUrl  = (file: any): Promise<any> => {
    console.log(file);
    
    const data = new FormData();
    data.append('file', file);
    return axios.post('/file/create-signed-url', data, {
        headers: {
            'Content-Type': file.type
        },
        withCredentials: false,
    });
}

type WritePinPayload = {
    relationUrl: string,
    body: string,
    urls: string[],
    tags: string[],
}

type UpdatePinPayload = {
    id: string, 
    relationUrl: string, 
    body: string, 
    urls: string[], 
    tags: string[],
}

export const writePinAPI = ({ relationUrl, body, urls, tags }: WritePinPayload): Promise<any> => axios.post('/pin', {
    relationUrl, body, urls, tags 
});

export const updatePinAPI = ({ id, relationUrl, body, urls, tags }: UpdatePinPayload): Promise<any> => axios.patch(`/pin/${id}`, {
    relationUrl, body, urls, tags
});