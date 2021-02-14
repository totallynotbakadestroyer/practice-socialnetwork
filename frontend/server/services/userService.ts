import sequelize from '../../sequelize';
import { UserAttributes } from '../types';

const userModel = sequelize.models.User;

const findUser = async (query: Partial<UserAttributes>): Promise<any | null> =>
  userModel.findOne({ raw: true, where: { ...query } });

export default {
  findUser,
};

console.log(findUser({ email: 'testemail@test.com' }));
