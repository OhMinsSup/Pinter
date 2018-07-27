import axios from 'axios';

export const createSignedUrl = (file: any): Promise<any> => {
    const data = new FormData();
    data.append('file', file);
    return axios.post('/pin/create-signed-url', data, {
        headers: {
            'Content-Type': file.type
        },
        withCredentials: false,
    });
}