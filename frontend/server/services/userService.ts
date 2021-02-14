import sequelize from '../../sequelize';
import { UserAttributes, UserCredentials, UserInfoAttributes } from '../types';

const userModel = sequelize.models.user;
const userInfoModel = sequelize.models.userInfo;

const findUser = async (query: Partial<UserAttributes>): Promise<any | null> =>
  userModel.findOne({ raw: true, where: { ...query } });

const createUser = async (credentials: UserCredentials, userInfo: UserInfoAttributes) => {
  console.log(credentials);
  return userModel.create({ ...credentials, userInfo }, { include: [userInfoModel] });
};

export default {
  findUser,
  createUser,
};
