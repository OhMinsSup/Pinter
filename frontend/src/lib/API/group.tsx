import axios from 'axios';

type CreateGroupPayload = {
  title: string;
  activation: boolean;
};
export const groupAddPinAPI = (pinId: string, groupId: string): Promise<any> =>
  axios.post('/pin/groups/pin/add', { groupId, pinId });
export const groupDeletePinAPI = (
  groupId: string,
  pinId: string
): Promise<any> => axios.delete(`/pin/groups/${groupId}/pin/delete/${pinId}`);
export const createGroupAPI = ({
  title,
  activation,
}: CreateGroupPayload): Promise<any> =>
  axios.post('/pin/groups/', { title, activation });
export const deleteGroupAPI = (groupId: string): Promise<any> =>
  axios.delete(`/pin/groups/${groupId}`);
export const updateGroupAPI = (groupId: string): Promise<any> =>
  axios.put(`/pin/groups/${groupId}`);
export const nextAPI = (next: string): Promise<any> => axios.get(next);
export const groupListAPI = (
  active: boolean,
  displayName: string
): Promise<any> => axios.get(`/pin/groups/${displayName}/list/${active}`);
export const groupPinListAPI = (groupId: string): Promise<any> =>
  axios.get(`/pin/groups/${groupId}/list`);
export const getGroupAPI = (groupId: string): Promise<any> =>
  axios.get(`/pin/groups/${groupId}`);
