import { Sequelize } from 'sequelize';

const setAssociations = (sequelize: Sequelize): void => {
  const { User, UserInfo } = sequelize.models;
  User.hasOne(UserInfo);
  UserInfo.belongsTo(User);
};

export default setAssociations;
