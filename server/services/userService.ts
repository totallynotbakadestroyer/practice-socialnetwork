import sequelize from '../../sequelize';
import { UserAttributes, UserCredentials, UserInfoAttributes } from '../types';

const userModel = sequelize.models.user;
const userInfoModel = sequelize.models.userInfo;
const { workInfo, userContacts } = sequelize.models;

const findUser = async (query: Partial<UserAttributes>): Promise<any | null> => {
  const user = await userModel.scope('withPassword').findOne({
    where: { ...query },
    include: [
      {
        model: userInfoModel,
        include: [
          { model: workInfo, as: 'work' },
          { model: userContacts, as: 'contacts' },
        ],
      },
    ],
  });
  if (!user) {
    return null;
  }
  return user.toJSON();
};

const createUser = async (credentials: UserCredentials, userInfo: UserInfoAttributes) => {
  console.log(credentials);
  return userModel.create({ ...credentials, userInfo }, { include: [userInfoModel] });
};

const updateUser = async (id, updateFields) => {
  const user = await userModel.findOne({
    where: { id },
    include: [
      {
        model: userInfoModel,
        include: [
          { model: workInfo, as: 'work' },
          { model: userContacts, as: 'contacts' },
        ],
      },
    ],
  });
  if (!user) {
    return null;
  }
  await user.update(updateFields);
  return user.toJSON();
};

const deleteUser = async (id) => userModel.destroy({ where: { id } });

export default {
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
