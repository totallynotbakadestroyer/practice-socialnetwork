import { randomBytes } from 'crypto';
import path from 'path';
import * as fs from 'fs';
import retry from 'async-await-retry';
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

export const generateId = (size = 16): string => randomBytes(size).toString('hex');

const generateNotification = (type, currentUserId, conversation, message) => {
  switch (type) {
    case 'MESSAGE_NOTIFICATION':
      if (conversation.isPrivate) {
        const user = conversation.participants.find(
          (participant) => participant.userId !== currentUserId
        );
        return { type, id: generateId(), trigger: user.userInfo, content: { data: message } };
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

const generateFileName = (name) => {
  const newFileName = generateId(64) + name.substring(name.lastIndexOf('.'));
  return new Promise((resolve, reject) => {
    fs.access(path.join(__dirname, './public/images/avatars', newFileName), (error) => {
      if (error) return resolve(newFileName);
      reject(Error);
    });
  });
};

export const uploadAvatar = async (avatarFile) => {
  avatarFile.name = await retry(generateFileName, [avatarFile.name], { retriesMax: 5 });
  await avatarFile.mv(path.join(__dirname, './public/images/avatars', avatarFile.name));
  return {
    user: {
      userInfo: {
        avatar: path.join('/images/avatars', avatarFile.name),
      },
    },
  };
};

export const deleteAvatar = async (avatarPath) =>
  fs.promises.unlink(path.join(__dirname, './public', avatarPath));
