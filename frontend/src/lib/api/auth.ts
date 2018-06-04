import axios from 'axios';

export const sendAuthEmailAPI = (email: string): Promise<any> => axios.post('auth/send-auth-email', { email });
export const codeAPI = (code: string): Promise<any> => axios.get(`auth/code/${code}`)

type LocalRegisterPayload = {
    registerToken: string
    username: string
    displayName: string        
};

export const localRegisterAPI = ({
    registerToken,
    username,
    displayName
}: LocalRegisterPayload): Promise<any> => axios.post('/auth/email-register', {
    registerToken,
    username,
    displayName
});

export const localLoginAPI = (code: string): Promise<any> => axios.post('auth/email-login', { code });

