import axios from './axiosInstance';

const signIn = async (credentials) => axios().post('/auth/login', credentials);

const signUp = async (payload) => axios().post('/auth/signup', payload);

export default { signUp, signIn };
