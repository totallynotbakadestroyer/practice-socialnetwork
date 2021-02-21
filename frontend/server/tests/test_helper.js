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
      conversations: [
        {
          id: 54013,
          name: 'testConvo',
          messages: [{ text: 'wanna get better and i need to now' }],
        },
      ],
      profilePosts: [
        { id: 4234242, authorId: 69348503, text: 'testtest1' },
        { text: 'testtest2', authorId: 69348503 },
        { text: 'testtest3', authorId: 69348503 },
        { text: 'testtest4', authorId: 69348503 },
        { text: 'testtest5', authorId: 69348503 },
        { text: 'testtest6', authorId: 69348503 },
        { text: 'testtest7', authorId: 69348503 },
        { text: 'testtest8', authorId: 69348503 },
        { text: 'testtest9', authorId: 69348503 },
        { text: 'testtest10', authorId: 69348503 },
        { text: 'testtest11', authorId: 69348503 },
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
  const { user, userInfo, post, conversation, message } = sequelize.models;
  await user.destroy({ truncate: true, cascade: true });
  await conversation.destroy({ truncate: true, cascade: true });
  const createdUser = await user.create(initialUsers[0], {
    include: [
      {
        model: userInfo,
        include: [
          { model: post, as: 'profilePosts' },
          {
            model: conversation,
            as: 'conversations',
            include: {
              model: message,
              as: 'messages',
            },
          },
        ],
      },
    ],
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
