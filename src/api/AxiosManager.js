import axios from 'axios';

// TODO: 9일 이후 baseURL에서 /api 제외한 후 socialApi는 삭제
// FIXME: 배포 시 dev에서 prod로 수정
const api = axios.create({
  baseURL: 'https://dev.hwa-mok.com/api',
  withCredentials: true,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

const formApi = axios.create({
  baseURL: 'https://dev.hwa-mok.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const socialApi = axios.create({
  baseURL: 'https://dev.hwa-mok.com',
  withCredentials: true,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
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
};
