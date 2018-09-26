import axios from 'axios';

export const getProfileAPI = (displayName: string): Promise<any> => axios.get(`/common/info/${displayName}`);
export const usersAPI = () => axios.get('/common/users');
export const nextAPI = (next: string) => axios.get(next);

export const searchPinAPI = (value: string) => axios.post(`/common/search/pin`, { value });
export const searchUserAPI = (value: string) => axios.post(`/common/search/user`, { value });
export const searchTagAPI = (value: string) => axios.post(`/common/search/tag`, { value });