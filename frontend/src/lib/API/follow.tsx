import axios from 'axios';
import * as queryString from 'query-string';

export const followAPI = (displayName: string): Promise<any> =>
  axios.post(`/follow/${displayName}`);
export const unfollowAPI = (displayName: string): Promise<any> =>
  axios.delete(`/follow/${displayName}`);
export const getFollowAPI = (displayName: string): Promise<any> =>
  axios.get(`/follow/exists/${displayName}`);
export const getFollowingAPI = (
  displayName: string,
  cursor: boolean | null
): Promise<any> => {
  if (cursor) {
    return axios.get(
      `/follow/${displayName}/following/?${queryString.stringify({ cursor })}`
    );
  }
  return axios.get(`/follow/${displayName}/following`);
};

export const getFollowerAPI = (
  displayName: string,
  cursor: boolean | null
): Promise<any> => {
  if (cursor) {
    return axios.get(
      `/follow/${displayName}/follower/?${queryString.stringify({ cursor })}`
    );
  }
  return axios.get(`/follow/${displayName}/follower`);
};
