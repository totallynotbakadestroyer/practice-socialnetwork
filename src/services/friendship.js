import axios from './axiosInstance';

const baseURL = '/friends';

const getFriends = async (section = 'all') => {
  const { data } = await axios().get(baseURL, { params: { section } });
  console.log(data);
  return data;
};

const getFriendsById = async (id) => {
  const { data } = await axios().get(`${baseURL}/${id}`);
  return data;
};

const sendFriendRequest = async (id) => axios().post(`${baseURL}/${id}/add-friend`);

const acceptFriendRequest = async (id) => axios().post(`${baseURL}/${id}/accept-friend-request`);

const rejectFriendRequest = async (id) => axios().delete(`${baseURL}/${id}/reject-friend-request`);

const cancelFriendRequest = async (id) => axios().delete(`${baseURL}/${id}/cancel-friend-request`);

const deleteFriend = async (id) => axios().delete(`${baseURL}/${id}/delete-friend`);

export default {
  getFriends,
  getFriendsById,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  deleteFriend,
};
