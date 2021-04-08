import { DataTypes, Sequelize } from 'sequelize';
import { deleteAvatar } from '../../server/helpers';

export default (sequelize: Sequelize): void => {
  const userInfo = <any>sequelize.define('userInfo', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });
  userInfo.afterUpdate(async (updatedInfo) => {
    console.log(updatedInfo);
    if (updatedInfo.changed('avatar')) {
      const avatar = updatedInfo.previous('avatar');
      await deleteAvatar(avatar).catch((e) => undefined);
    }
  });
};
