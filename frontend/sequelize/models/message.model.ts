import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
    },
  });
};
