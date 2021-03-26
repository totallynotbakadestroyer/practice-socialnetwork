import axios from './axiosInstance';

const getUser = async (id) => axios().get(`/users/${id}`);

const updateUser = async (id, payload) => axios().put(`/users/${id}`, payload);

export default { getUser, updateUser };
