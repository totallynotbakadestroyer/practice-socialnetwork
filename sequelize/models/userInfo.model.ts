import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define('userInfo', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    workPlace: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    relationship: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });
};
