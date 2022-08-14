import axios from 'axios';

const api = axios.create({
  baseURL: 'http://43.200.174.197/api',
  withCredentials: true,
  headers: {
    Authorization: '',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('TOKEN');
  config.headers.common['Authorization'] = `${accessToken}`;
  return config;
});

export default api;