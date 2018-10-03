import axios from 'axios';

export const listGroupAPI = (): Promise<any> => axios.get('/group/');
export const nextAPI = (next: string): Promise<any> => axios.get(next);