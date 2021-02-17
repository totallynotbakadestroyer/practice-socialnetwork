import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define('post', {
    text: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
