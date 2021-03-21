import { getUserById } from './socket';
import sequelize from '../sequelize';

export const isUserParticipant = async (conversationId, userId) => {
  const conversation: any = await sequelize.models.conversation.findOne({
    where: {
      id: conversationId,
    },
    include: [
      {
        model: sequelize.models.conversationParticipant,
        as: 'participants',
        include: [sequelize.models.userInfo],
      },
    ],
  });
  if (!conversation) {
    return null;
  }
  const participants = await conversation.get('participants');
  if (!(participants as any[]).some((x) => x.userId === userId)) {
    return null;
  }
  return conversation;
};

const generateNotification = (type, currentUserId, conversation, message) => {
  switch (type) {
    case 'MESSAGE_NOTIFICATION':
      if (conversation.isPrivate) {
        const user = conversation.participants.find(
          (participant) => participant.userId !== currentUserId
        );
        return { type, trigger: user.userInfo.firstName, content: { data: message } };
      }
      return null;
    default:
      break;
  }
};

export const sendNotificationToConversationParticipants = async (
  conversation: any,
  message: any,
  currentId: number | string
) => {
  conversation.participants.forEach((participant) => {
    if (participant.userId === currentId) {
      return;
    }
    const notification = generateNotification(
      'MESSAGE_NOTIFICATION',
      currentId,
      conversation,
      message
    );
    const socket = getUserById(participant.userId);
    if (socket) {
      socket.emit('notification', notification);
    }
  });
};
