import { Sequelize } from 'sequelize';

const setAssociations = (sequelize: Sequelize): void => {
  const { user, userInfo, post, conversation, message, conversationParticipant } = sequelize.models;
  user.hasOne(userInfo, { foreignKey: 'id' });
  userInfo.belongsTo(user, { foreignKey: 'id' });
  userInfo.hasMany(post, { as: 'createdPosts', foreignKey: 'authorId' });
  userInfo.hasMany(post, { as: 'profilePosts', foreignKey: 'destinationUserId' });
  post.belongsTo(userInfo, { as: 'author', foreignKey: 'authorId' });
  post.belongsTo(userInfo, { as: 'destinationUser', foreignKey: 'destinationUserId' });
  userInfo.belongsToMany(conversation, {
    through: 'conversationParticipant',
    foreignKey: 'userId',
  });
  conversation.belongsToMany(userInfo, { through: 'conversationParticipant' });
  conversation.hasMany(message, { as: 'messages' });
  conversation.hasMany(conversationParticipant, { foreignKey: 'conversationId' });
  message.belongsTo(conversation);
  message.belongsTo(userInfo, { foreignKey: 'userId' });
  userInfo.hasMany(message, { as: 'sentMessages', foreignKey: 'userId' });
  userInfo.hasMany(conversationParticipant, { foreignKey: 'userId' });
};

export default setAssociations;
