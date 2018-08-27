import axios from 'axios';

export const readPinAPI = (id :string): Promise<any> => axios.get(`/pin/${id}`);