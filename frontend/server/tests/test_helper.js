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

export default {
  initialUsers,
  userToCreate,
};
