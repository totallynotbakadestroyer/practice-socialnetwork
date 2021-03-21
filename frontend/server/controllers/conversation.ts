import express from 'express';
import conversationService from '../services/coversationService';
import { sendNotificationToConversationParticipants } from '../helpers';

const conversation = express.Router();

conversation.get('/conversations', async (req, res) => {
  const { id } = req.user;
  const conversations = await conversationService.findUserConversations(id);
  res.json(conversations);
});

conversation.get('/conversations/:id', async (req, res) => {
  const { id } = req.user;
  const { id: convId } = req.params;
  const messages = await conversationService.findMessages(id, convId);
  res.json(messages);
});

conversation.post('/conversations/:id', async (req, res) => {
  const { id } = req.user;
  const { id: convId } = req.params;
  const message = req.body;
  const {
    createdMessage,
    conversation: currentConversation,
  } = await conversationService.sendMessageToConvo(id, convId, message);
  req.io.to(`conversation-${convId}`).emit('newMessage', createdMessage);
  await sendNotificationToConversationParticipants(currentConversation, createdMessage.text, id);
  res.end();
});

export default conversation;
