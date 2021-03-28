import supertest from 'supertest';
import app from '../app';
import sequelize from '../../sequelize';
import helper from './test_helper';

const api = supertest(app);

let jwt;
let userData;

beforeEach(async () => {
  const newUser = await helper.generateTestJwt();
  jwt = newUser.jwt;
  userData = newUser.userData;
});
afterAll(async () => {
  await sequelize.close();
});

describe('getting conversations', () => {
  const baseUrl = '/api/conversations/';
  test('should return 200 on successful request', async () => {
    await api.get(baseUrl).set('Authorization', jwt).expect(200);
  });
  test('should return user conversations on successful request', async () => {
    const result = await api.get(baseUrl).set('Authorization', jwt);
    expect(result.body[0]).toHaveProperty('isPrivate');
    expect(result.body).toHaveLength(userData.userInfo.conversations.length);
  });
  test('should return 401 on request with no auth', async () => {
    await api.get(baseUrl).expect(401);
  });
  test('should return nothing on request with no auth', async () => {
    const result = await api.get(baseUrl);
    expect(result.body).toMatchObject({});
  });
});

describe('getting conversation info', () => {
  const baseUrl = '/api/conversations/54013/';
  test('should return 200 on successful request', async () => {
    await api.get(baseUrl).set('Authorization', jwt).expect(200);
  });
  test('should return conversation info on successful request', async () => {
    const result = await api.get(baseUrl).set('Authorization', jwt);
    expect(result.body).toHaveProperty('messages');
  });
  test('should return 401 on request with no auth', async () => {
    await api.get(baseUrl).expect(401);
  });
  test('should return nothing on request with no auth', async () => {
    const result = await api.get(baseUrl);
    expect(result.body).toMatchObject({});
  });
});
