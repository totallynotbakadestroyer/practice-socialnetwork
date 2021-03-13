import axios from '@/services/axiosInstance';

const getUserConversations = async () => {
  const { data } = await axios({ requiresAuth: true }).get('/conversations');
  return data;
};

export default {
  getUserConversations,
};
