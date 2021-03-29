import sequelize from '../../sequelize';
import { UserAttributes, UserCredentials, UserInfoAttributes } from '../types';

const userModel = sequelize.models.user;
const userInfoModel = sequelize.models.userInfo;

const findUser = async (query: Partial<UserAttributes>): Promise<any | null> => {
  const user = await userModel
    .scope('withPassword')
    .findOne({ where: { ...query }, include: [userInfoModel] });
  if (!user) {
    return null;
  }
  return user?.toJSON();
};

const createUser = async (credentials: UserCredentials, userInfo: UserInfoAttributes) => {
  console.log(credentials);
  return userModel.create({ ...credentials, userInfo }, { include: [userInfoModel] });
};

export default {
  findUser,
  createUser,
};
