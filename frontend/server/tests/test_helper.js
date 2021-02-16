import jwt from 'jsonwebtoken';
import sequelize from '../../sequelize';

const initialUsers = [
  {
    email: 'testemail@test.com',
    password: 'testpassword',
    userInfo: {
      firstName: 'cooltest',
      lastName: 'cooluser',
      dateOfBirth: new Date().getTime(),
    },
  },
  {
    email: 'anothertest@test.com',
    password: 'anothertestpassword',
    userInfo: {
      firstName: 'test',
      lastName: 'user',
      dateOfBirth: new Date().getTime(),
    },
  },
];

const userToCreate = {
  email: 'createduser@test.com',
  password: 'createdpassword',
  firstName: 'createduser',
  lastName: 'createduser',
  dateOfBirth: new Date().getTime(),
};

const generateTestJwt = async () => {
  const { user, userInfo } = sequelize.models;
  const createdUser = await user.create(initialUsers[0], { include: userInfo });
  const userData = createdUser.toJSON();
  const token = `Bearer ${jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)}`;
  return { userData, jwt: token };
};

export default {
  initialUsers,
  userToCreate,
  generateTestJwt,
};
