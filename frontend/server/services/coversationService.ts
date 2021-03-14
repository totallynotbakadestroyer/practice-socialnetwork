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
  const messages = await conversationModel.findOne({
    where: { id: conversationId },
    include: [
      {
        model: conversationParticipantModel,
        attributes: ['conversationId'],
        where: {
          userId,
        },
      },
      {
        model: messageModel,
        as: 'messages',
        attributes: ['createdAt', 'text', 'id', 'userId'],
        include: [{ model: userInfoModel }],
      },
    ],
  });
  if (!messages) {
    return null;
  }
  return messages.toJSON();
};

const sendMessageToConvo = async (userId, conversationId, message) => {
  const conversation: any = await isUserParticipant(conversationId, userId);
  if (!conversation) {
    return null;
  }
  const newMessage = await messageModel.create({ ...message, userId, conversationId });

  return newMessage;
};

export default {
  findUserConversations,
  findMessages,
  sendMessageToConvo,
};
