import axios from 'axios';

export const logoutAPI = (): Promise<any> => axios.post('/auth/logout');
export const checkAPI = (): Promise<any> => axios.get('/auth/check');