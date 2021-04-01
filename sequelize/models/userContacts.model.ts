import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define('userContacts', {
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    discordTag: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
  });
};
