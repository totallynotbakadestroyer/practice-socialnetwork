import axios from 'axios';
import store from '../store/index';
import router from '../router';

export default ({ requiresAuth = true } = {}) => {
  const axiosInstance = axios.create({
    baseURL: '/api',
  });

  if (requiresAuth) {
    axiosInstance.interceptors.request.use((config) => {
      const { token } = store.state;
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/') {
        throw error;
      }
      if (error.response.status === 401) {
        await router.push('/login');
        throw error;
      }
    }
  );
  return axiosInstance;
};
