import { Sequelize } from 'sequelize';

const setAssociations = (sequelize: Sequelize): void => {
  const { user, userInfo, post } = sequelize.models;
  user.hasOne(userInfo, { foreignKey: 'id' });
  userInfo.belongsTo(user, { foreignKey: 'id' });
  userInfo.hasMany(post, { foreignKey: 'authorId' });
  post.belongsTo(userInfo, { foreignKey: 'authorId' });
};

export default setAssociations;
