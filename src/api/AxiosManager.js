import axios from 'axios';

// TODO: 배포 시에만 baseURL 수정하도록.
// 운영용 (54.180.26.250) 개발용 (43.200.174.197)
const api = axios.create({
  baseURL: 'http://43.200.174.197/api',
  withCredentials: true,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

const formApi = axios.create({
  baseURL: 'http://43.200.174.197/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const socialApi = axios.create({
  baseURL: 'http://43.200.174.197',
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
