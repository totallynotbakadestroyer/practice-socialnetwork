import sequelize from '../../sequelize';
import { isUserParticipant } from '../helpers';

const conversationModel = sequelize.models.conversation;
const messageModel = sequelize.models.message;
const conversationParticipantModel = sequelize.models.conversationParticipant;
const userInfoModel = sequelize.models.userInfo;

const findUserConversations = async (userId) => {
  const user = await userInfoModel.findOne({
    where: { id: userId },
    include: [
      {
        model: conversationModel,
        through: { attributes: [] },
        include: [
          { model: conversationParticipantModel, as: 'participants', include: [userInfoModel] },
        ],
      },
    ],
  });
  if (!user) {
    return;
  }
  return user.get('conversations');
};

const findMessages = async (userId, conversationId) => {
  const conversation = await conversationModel.findOne({
    where: { id: conversationId },
    include: [
      {
        model: messageModel,
        as: 'messages',
        attributes: ['createdAt', 'text', 'id', 'userId'],
        include: [{ model: userInfoModel }],
      },
    ],
  });
  if (!conversation) {
    return null;
  }
  return conversation.get('messages');
};

const sendMessageToConvo = async (userId, conversationId, message) => {
  const conversation: any = await isUserParticipant(conversationId, userId);
  if (!conversation) {
    return null;
  }
  const newMessage: any = await messageModel.create({ ...message, userId, conversationId });
  return messageModel.findOne({
    where: { id: newMessage.id },
    include: [userInfoModel],
  });
};

export default {
  findUserConversations,
  findMessages,
  sendMessageToConvo,
};
