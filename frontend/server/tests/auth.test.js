import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import sequelize from '../../sequelize';
import helper from './test_helper';

console.log(sequelize.models);

const { User } = sequelize.models;

const api = supertest(app);

beforeEach(async () => {
  await User.destroy({ truncate: true, cascade: true });

  const userObjects = helper.initialUsers.map((user) => User.build(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});
afterAll(async () => {
  await sequelize.close();
});

describe('logging in', () => {
  const baseUrl = '/api/auth/login';
  test('should return 200 if user exists and password is right', async () => {
    await api.post(baseUrl).send(helper.initialUsers[0]).expect(200);
  });
  test('should return JWT if user exists and password is right', async () => {
    const result = await api.post(baseUrl).send(helper.initialUsers[0]);

    expect(result.header).toHaveProperty('authorization');
    expect(
      jwt.verify(result.header.authorization.split(' ')[1], process.env.JWT_SECRET)
    ).toBeTruthy();
  });
  test('JWT should contain user id', async () => {
    const result = await api.post(baseUrl).send(helper.initialUsers[0]);

    const jwtPayload = jwt.decode(result.header.authorization.split(' ')[1]);
    expect(jwtPayload).toHaveProperty('id');
  });
  test('should return 400 if password is wrong', async () => {
    await api
      .post(baseUrl)
      .send({ email: helper.initialUsers[0].email, password: 'wrongpassword' })
      .expect(400);
  });
  test('should return 400 if user not found', async () => {
    await api.post(baseUrl).send({ email: 'someemail', password: 'wrongpassword' }).expect(400);
  });
  test('should return 400 if nothing is provided', async () => {
    await api.post(baseUrl).send().expect(400);
  });
  test('errors should not send authorization header', async () => {
    const result = await api
      .post(baseUrl)
      .send({ email: helper.initialUsers[0].email, password: 'wrongpassword' });
    expect(result.header).not.toHaveProperty('authorization');
  });
});
