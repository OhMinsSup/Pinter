import axios from 'axios';

export const groupListAPI = (): Promise<any> => axios.get('/pin/groups/list');

type CreateGroupPayload = {
    title: string,
    activation: boolean,
}

export const createGroupAPI = ({ title, activation }: CreateGroupPayload): Promise<any> => axios.post('/pin/groups/', { title, activation });
export const nextAPI = (next: string): Promise<any> => axios.get(next);