import axios from 'axios';

type LocalRegisterPayload = {
    registerToken: string, 
    username: string,
    displayName: string 
};

type SocialPayload = {
    accessToken: string,
    provider: string
};

type SocialRegisterPayload = {
    provider: string,
    accessToken :string,
    displayName: string, 
    username: string, 
    socialEmail: string
};

export enum typePayload {
    SocialPayload,
    SocialRegisterPayload,
    LocalRegisterPayload
}

export const sendAuthEmailAPI = (email: string): Promise<any> => axios.post('auth/send-auth-email', { email });
export const codeAPI = (code: string): Promise<any> => axios.get(`auth/code/${code}`)
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
export const socialRegisterAPI = ({ provider, accessToken, displayName, username, socialEmail }: SocialRegisterPayload): Promise<any> => axios.post(`/auth/register/${provider}`, {
    socialEmail,
    accessToken, 
    displayName, 
    username,
  });
export const socialLoginAPI = ({ accessToken, provider }: SocialPayload): Promise<any> => axios.post(`/auth/login/${provider}`, { accessToken });
export const verifySocialAPI = ({ accessToken, provider }: SocialPayload): Promise<any> => axios.post(`/auth/verify-social/${provider}`, { accessToken });