import sequelize from '../../sequelize';

const { userInfo } = sequelize.models;

const getUserFriends = async (id) => {
  const user: any = await userInfo.findOne({
    where: { id },
    include: [
      {
        through: { attributes: [] },
        model: userInfo,
        as: 'friends',
        attributes: ['id', 'firstName', 'avatar', 'lastName'],
      },
    ],
  });
  if (!user) return null;
  return user.friends;
};

const getFriendRequestsSent = async (id) => {
  const user: any = await userInfo.findOne({
    where: { id },
    include: [
      {
        model: userInfo,
        as: 'requestees',
        through: { attributes: [] },
        attributes: ['id', 'firstName', 'avatar', 'lastName'],
      },
    ],
  });
  if (!user) return null;
  return user.requestees;
};

const getFriendRequestsPending = async (id) => {
  const user: any = await userInfo.findOne({
    where: { id },
    include: [
      {
        model: userInfo,
        as: 'requesters',
        through: { attributes: [] },
        attributes: ['id', 'firstName', 'avatar', 'lastName'],
      },
    ],
  });
  if (!user) return null;
  return user.requesters;
};

const sendFriendRequest = async (currentId, userId) => {
  const user: any = await userInfo.findOne({
    where: {
      id: currentId,
    },
  });
  return user.addRequestees(userId);
};

const deleteFriendRequest = async (currentId, userId) => {
  const user: any = await userInfo.findOne({
    where: {
      id: currentId,
    },
  });
  return user.removeRequestees(userId);
};

const rejectFriendRequest = async (currentId, userId) => {
  const user: any = await userInfo.findOne({
    where: {
      id: currentId,
    },
  });
  return user.removeRequesters(userId);
};

const acceptFriendRequest = async (currentId, userId) => {
  const user: any = await userInfo.findOne({
    where: {
      id: currentId,
    },
  });
  const friend: any = await userInfo.findOne({
    where: {
      id: userId,
    },
  });
  return Promise.all([
    user.addFriend(userId),
    friend.addFriend(currentId),
    user.removeRequesters(userId),
  ]);
};

const deleteFriend = async (currentId, userId) => {
  const user: any = await userInfo.findOne({
    where: {
      id: currentId,
    },
  });
  const friend: any = await userInfo.findOne({
    where: {
      id: userId,
    },
  });
  return Promise.all([user.removeFriend(userId), friend.removeFriend(currentId)]);
};

export default {
  getUserFriends,
  getFriendRequestsSent,
  getFriendRequestsPending,
  sendFriendRequest,
  deleteFriend,
  deleteFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
