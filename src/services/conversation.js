import axios from '@/services/axiosInstance';

const getUserConversations = async () => {
  const { data } = await axios().get('/conversations');
  return data;
};

const getMessagesByConversationId = async (id) => {
  const { data } = await axios().get(`/conversations/${id}`);
  return data;
};

const sendMessageToConvo = async (id, message) => {
  const { data } = await axios().post(`/conversations/${id}`, message);
  return data;
};

export default {
  getUserConversations,
  getMessagesByConversationId,
  sendMessageToConvo,
};
