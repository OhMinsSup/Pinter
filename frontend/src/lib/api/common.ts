import axios from 'axios';

export const usersAPI = () => axios.get('/common/users');
export const nextAPI = (next: string) => axios.get(next);