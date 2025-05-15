import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://srv809058.hstgr.cloud/',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
