import { DataTypes, Sequelize } from 'sequelize';
import { PostStatic } from '../../server/types';

export default (sequelize: Sequelize): void => {
  <PostStatic>sequelize.define('post', {
    text: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
