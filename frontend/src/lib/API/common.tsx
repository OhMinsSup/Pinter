import axios from 'axios';

export const getProfileAPI = (displayName: string): Promise<any> => axios.get(`/common/info/${displayName}`);
export const usersAPI = () => axios.get('/common/users');
export const nextAPI = (next: string) => axios.get(next);