import axios from 'axios';

// FIXME: 배포 시 dev에서 prod로 수정 .env 사용
const api = axios.create({
  baseURL: 'https://dev.hwa-mok.com',
  withCredentials: true,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

const formApi = axios.create({
  baseURL: 'https://dev.hwa-mok.com',
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
