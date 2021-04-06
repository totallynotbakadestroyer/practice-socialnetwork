import { DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserStatic } from '../../server/types';

export default (sequelize: Sequelize): void => {
  const user = <UserStatic>sequelize.define(
    'user',
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        defaultValue: 'USER',
        type: DataTypes.STRING,
      },
      isCompleted: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isBanned: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isActivated: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { exclude: [] },
        },
      },
    }
  );
  user.beforeCreate(async (newUser) => {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  });
  user.beforeUpdate(async (newUser) => {
    if (newUser.changed('email')) {
      newUser.isActivated = false;
    }
    if (newUser.changed('password')) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
  });
};
