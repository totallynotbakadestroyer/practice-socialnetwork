import { Sequelize } from 'sequelize';

const setAssociations = (sequelize: Sequelize): void => {
  const { user, userInfo } = sequelize.models;
  user.hasOne(userInfo);
  userInfo.belongsTo(user);
};

export default setAssociations;
