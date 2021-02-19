import axios from './axiosInstance';

const getUser = async (id) => axios({ requiresAuth: true }).get(`/users/${id}`);

const updateUser = async (id, payload) =>
  axios({ requiresAuth: true }).put(`/users/${id}`, payload);

export default { getUser, updateUser };
