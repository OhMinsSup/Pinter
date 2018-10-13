import axios from 'axios';

export const groupListAPI = (active: boolean): Promise<any> => axios.get(`/pin/groups/list/${active}`);

type CreateGroupPayload = {
    title: string,
    activation: boolean,
}
export const groupAddPinAPI = (pinId: string, groupId: string): Promise<any> => axios.post('/pin/groups/pin/add', { groupId, pinId });
export const createGroupAPI = ({ title, activation }: CreateGroupPayload): Promise<any> => axios.post('/pin/groups/', { title, activation });
export const nextAPI = (next: string): Promise<any> => axios.get(next);