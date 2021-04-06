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

const createUser = async (credentials: UserCredentials, userInfo: UserInfoAttributes) =>
  userModel.create(
    {
      ...credentials,
      userInfo: { ...userInfo, work: {}, contacts: {} },
    },
    {
      include: [
        {
          model: userInfoModel,
          include: [
            { model: workInfo, as: 'work' },
            { model: userContacts, as: 'contacts' },
          ],
        },
      ],
    }
  );

const updateUser = async (id, updateFields) => {
  // todo: disgusting, should find a better solution
  if (updateFields.userInfo) {
    if (updateFields.userInfo.work) {
      await workInfo.update(updateFields.userInfo.work, { where: { id } });
    } else if (updateFields.userInfo.contacts) {
      await userContacts.update(updateFields.userInfo.contacts, { where: { id } });
    } else {
      await userInfoModel.update(updateFields.userInfo, { where: { id } });
    }
  } else {
    await userModel.update(updateFields, { where: { id }, individualHooks: true });
  }

  return userModel.findOne({
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
};

const deleteUser = async (id) => userModel.destroy({ where: { id } });

export default {
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
