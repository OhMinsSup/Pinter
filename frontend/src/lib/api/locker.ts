import axios from 'axios';

export const lockerUserListAPI = (id: string): Promise<any> => axios.get(`/locker/${id}`);
export const lockerListAPI = (displayName: string): Promise<any> => axios.get(`/locker/${displayName}/list`);
export const nextAPI = (next: string): Promise<any> => axios.get(next);