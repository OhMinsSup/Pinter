import axios from 'axios';

export const getUserInfoAPI = (displayName: string): Promise<any> => axios.get(`/common/info/${displayName}`);