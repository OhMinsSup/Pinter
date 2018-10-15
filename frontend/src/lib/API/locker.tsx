import axios from 'axios';

export const lockerPinAPI = (id: string): Promise<any> =>
  axios.post(`/locker/${id}`);
export const unlockerPinAPI = (id: string): Promise<any> =>
  axios.delete(`/locker/${id}`);
export const getlockerPinAPI = (id: string): Promise<any> =>
  axios.get(`/locker/${id}`);
export const listLockerAPI = (displayName: string): Promise<any> =>
  axios.get(`/locker/${displayName}/user`);
export const nextAPI = (next: string): Promise<any> => axios.get(next);
