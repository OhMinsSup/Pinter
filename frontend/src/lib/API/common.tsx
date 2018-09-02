import axios from 'axios';

export const getProfileAPI = (displayName: string): Promise<any> => axios.get(`/common/info/${displayName}`);