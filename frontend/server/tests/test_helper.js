import jwt from 'jsonwebtoken';
import sequelize from '../../sequelize';

const initialUsers = [
  {
    id: 69348503,
    email: 'testemail@test.com',
    password: 'testpassword',
    userInfo: {
      firstName: 'cooltest',
      lastName: 'cooluser',
      dateOfBirth: new Date().getTime(),
      profilePosts: [
        { id: 4234242, text: 'testtest1' },
        { text: 'testtest2' },
        { text: 'testtest3' },
        { text: 'testtest4' },
        { text: 'testtest5' },
        { text: 'testtest6' },
        { text: 'testtest7' },
        { text: 'testtest8' },
        { text: 'testtest9' },
        { text: 'testtest10' },
        { text: 'testtest11' },
      ],
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
  const { user, userInfo, post } = sequelize.models;
  const createdUser = await user.create(initialUsers[0], {
    include: [{ model: userInfo, include: [{ model: post, as: 'profilePosts' }] }],
  });
  const userData = createdUser.toJSON();
  const token = `Bearer ${jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)}`;
  return { userData, jwt: token };
};

export default {
  initialUsers,
  userToCreate,
  generateTestJwt,
};
