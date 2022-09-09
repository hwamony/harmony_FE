import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  withCredentials: true,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

const formApi = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('TOKEN');
  config.headers.common['Authorization'] = `${accessToken}`;
  return config;
});

formApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('TOKEN');
  config.headers.common['Authorization'] = `${accessToken}`;
  return config;
});

export default api;

export const formdataApi = formApi;

export const apis = {
  getFamily: () => api.get('/family'),
  getValidUser: () => api.get('/user/info'),
  getCode: () => api.get('/family/code'),
  getNickname: () => api.get('/user/nickname'),
};
