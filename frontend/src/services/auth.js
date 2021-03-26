import axios from './axiosInstance';

const signIn = async (credentials) =>
  axios({ requiresAuth: false }).post('/auth/login', credentials);

const signUp = async (payload) => axios({ requiresAuth: false }).post('/auth/signup', payload);

export default { signUp, signIn };
