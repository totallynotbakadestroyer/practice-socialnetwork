import axios from './axiosInstance';

const baseURL = '/profile';

const getUser = async () => {
  const { data } = await axios().get(baseURL);
  return data;
};

const updateUser = async (payload) => {
  const { data } = await axios().put(baseURL, payload);
  return data;
};

const deleteUser = async () => axios().delete(baseURL);

export default { getUser, updateUser, deleteUser };
