import { DataTypes, Sequelize } from 'sequelize';
import withPagination from 'sequelize-cursor-pagination';
import { PostStatic } from '../../server/types';

export default (sequelize: Sequelize): void => {
  const post = <PostStatic>sequelize.define('post', {
    text: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
  const options = {
    methodName: 'paginate',
    primaryKeyField: 'id',
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  withPagination(options)(post);
};
