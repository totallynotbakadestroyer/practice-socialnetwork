import sequelize from '../../sequelize';
import { UserInfoAttributes } from '../types';

const userInfoModel = sequelize.models.userInfo;
const userModel = sequelize.models.user;
const { workInfo, userContacts } = sequelize.models;

const findUserInfo = async (userId: string) => {
  const userInfo = await userInfoModel.findOne({
    where: { id: userId },
    include: [
      { model: workInfo, as: 'work' },
      { model: userContacts, as: 'contacts' },
    ],
  });
  if (!userInfo) {
    return null;
  }
  return userInfo.toJSON();
};

const updateUserInfo = async (userId: string, updateFields: Partial<UserInfoAttributes>) => {
  const user = await userInfoModel.findOne({
    where: { id: userId },
    include: [userModel, { model: workInfo, as: 'work' }, { model: userContacts, as: 'contacts' }],
  });
  if (!user) {
    return null;
  }
  await user?.update(updateFields);
  return user.toJSON();
};

export default {
  findUserInfo,
  updateUserInfo,
};
