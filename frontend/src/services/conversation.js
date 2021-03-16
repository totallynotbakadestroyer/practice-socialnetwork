import axios from '@/services/axiosInstance';

const getUserConversations = async () => {
  const { data } = await axios({ requiresAuth: true }).get('/conversations');
  return data;
};

const getMessagesByConversationId = async (id) => {
  const { data } = await axios({ requiresAuth: true }).get(`/conversations/${id}`);
  return data;
};

const sendMessageToConvo = async (id, message) => {
  const { data } = await axios({ requiresAuth: true }).post(`/conversations/${id}`, message);
  return data;
};

export default {
  getUserConversations,
  getMessagesByConversationId,
  sendMessageToConvo,
};
