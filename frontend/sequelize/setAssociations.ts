import { Sequelize } from 'sequelize';

const setAssociations = (sequelize: Sequelize): void => {
  const { user, userInfo, post } = sequelize.models;
  user.hasOne(userInfo, { foreignKey: 'id' });
  userInfo.belongsTo(user, { foreignKey: 'id' });
  userInfo.hasMany(post, { as: 'createdPosts', foreignKey: 'authorId' });
  userInfo.hasMany(post, { as: 'profilePosts', foreignKey: 'destinationUserId' });
  post.belongsTo(userInfo, { as: 'author', foreignKey: 'authorId' });
  post.belongsTo(userInfo, { as: 'destinationUser', foreignKey: 'destinationUserId' });
};

export default setAssociations;
