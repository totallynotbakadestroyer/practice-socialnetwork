import sequelize from '../../sequelize';

const conversationModel = sequelize.models.conversation;
const messageModel = sequelize.models.message;
const conversationParticipantModel = sequelize.models.conversationParticipant;
const userInfoModel = sequelize.models.userInfo;

const findUserConversations = async (userId) => {
  const conversations = await conversationModel.findAll({
    include: [{ model: conversationParticipantModel, where: { userId } }],
  });
  return conversations;
};

const findMessages = async (userId, conversationId) => {
  const messages = await conversationModel.findOne({
    where: { id: conversationId },
    include: [
      {
        model: messageModel,
        as: 'messages',
        attributes: ['createdAt', 'text', 'id', 'userId'],
        include: [{ model: userInfoModel, attributes: ['avatar', 'firstName', 'lastName'] }],
      },
    ],
  });
  if (!messages) {
    return null;
  }
  return messages.toJSON();
};

export default {
  findUserConversations,
  findMessages,
};
