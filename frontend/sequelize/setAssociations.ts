import { Sequelize } from 'sequelize';

const setAssociations = (sequelize: Sequelize): void => {
  const { user, userInfo, post, conversation, message, conversationParticipant } = sequelize.models;
  user.hasOne(userInfo, { foreignKey: 'id' });
  userInfo.belongsTo(user, { foreignKey: 'id' });
  userInfo.hasMany(post, { as: 'createdPosts', foreignKey: 'authorId' });
  userInfo.hasMany(post, { as: 'profilePosts', foreignKey: 'destinationUserId' });
  userInfo.belongsToMany(conversation, {
    through: 'conversationParticipant',
    foreignKey: 'userId',
  });
  userInfo.belongsToMany(userInfo, {
    as: 'requestees',
    through: 'friendRequests',
    foreignKey: 'requesterId',
    onDelete: 'CASCADE',
  });
  userInfo.belongsToMany(userInfo, {
    as: 'requesters',
    through: 'friendRequests',
    foreignKey: 'requesteeId',
    onDelete: 'CASCADE',
  });
  userInfo.hasMany(message, { as: 'sentMessages', foreignKey: 'userId' });
  userInfo.hasMany(conversationParticipant, { foreignKey: 'userId' });
  userInfo.belongsToMany(userInfo, { as: 'friends', foreignKey: 'userId', through: 'userFriends' });
  post.belongsTo(userInfo, { as: 'author', foreignKey: 'authorId' });
  post.belongsTo(userInfo, { as: 'destinationUser', foreignKey: 'destinationUserId' });
  conversation.belongsToMany(userInfo, {
    through: 'conversationParticipant',
    foreignKey: 'conversationId',
  });
  conversationParticipant.belongsTo(userInfo, { foreignKey: 'userId' });
  conversation.hasMany(conversationParticipant, { as: 'participants' });
  conversation.hasMany(message, { as: 'messages' });
  message.belongsTo(conversation, { constraints: false });
  message.belongsTo(userInfo, { foreignKey: 'userId' });
};

export default setAssociations;
