import axios from 'axios';

export const getTagsAPI = (sort: string = 'latest'): Promise<any> => axios.get(`/tag/tags?sort=${sort}`);
export const getTagInfoAPI = (tag: string): Promise<any> => axios.get(`/tag/tags/${tag}`); 