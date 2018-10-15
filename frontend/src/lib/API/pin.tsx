import axios from 'axios';

export const readPinAPI = (id: string): Promise<any> => axios.get(`/pin/${id}`);

export const writeCommentAPI = (
  id: string,
  text: string,
  tags: string[]
): Promise<any> => axios.post(`/pin/comments/${id}`, { text, tags });
export const listCommentAPI = (id: string): Promise<any> =>
  axios.get(`/pin/comments/${id}`);
export const deleteCommentAPI = (id: string, commentId: string): Promise<any> =>
  axios.delete(`/pin/comments/${id}/${commentId}`);

export const likePinAPI = (id: string): Promise<any> =>
  axios.post(`/pin/likes/${id}`);
export const getlikePinAPI = (id: string): Promise<any> =>
  axios.get(`/pin/likes/${id}`);
export const unlikePinAPI = (id: string): Promise<any> =>
  axios.delete(`/pin/likes/${id}`);
