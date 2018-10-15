import axios from 'axios';

export const getProfileAPI = (displayName: string): Promise<any> =>
  axios.get(`/common/info/${displayName}`);
export const usersAPI = (): Promise<any> => axios.get('/common/users');
export const nextAPI = (next: string): Promise<any> => axios.get(next);

export const searchPinAPI = (value: string): Promise<any> =>
  axios.post(`/common/search/pin`, { value });
export const searchUserAPI = (value: string): Promise<any> =>
  axios.post(`/common/search/user`, { value });
export const searchTagAPI = (value: string): Promise<any> =>
  axios.post(`/common/search/tag`, { value });

export const createNoticeRoomAPI = (): Promise<any> =>
  axios.post('/common/notice');
export const sendMessageNoticeAPI = (message: string): Promise<any> =>
  axios.post('/common/notice/send-message', { message });
export const getNoticeMessageAPI = (): Promise<any> =>
  axios.get('/common/notice');
