import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define('workInfo', {
    companyName: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
  });
};
