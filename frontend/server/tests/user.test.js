import supertest from 'supertest';
import app from '../app';
import sequelize from '../../sequelize';
import helper from './test_helper';
import userInfoService from '../services/userInfoService';

const api = supertest(app);
let userData;
let jwt;

beforeEach(async () => {
  const newUser = await helper.generateTestJwt();
  jwt = newUser.jwt;
  userData = newUser.userData;
});
afterAll(async () => {
  await sequelize.close();
});

describe('getting user info', () => {
  const baseUrl = '/api/users/';
  test('should return 200 if logged in', async () => {
    await api.get(`${baseUrl}${userData.id}`).set('Authorization', jwt).expect(200);
  });
  test('should return userInfo if logged in', async () => {
    const result = await api.get(`${baseUrl}${userData.id}`).set('Authorization', jwt);
    console.log(result.body);
    expect(result.body.firstName).toBe(userData.userInfo.firstName);
    expect(result.body.lastName).toBe(userData.userInfo.lastName);
  });
  test('should return 401 if no authorization', async () => {
    await api.get(`${baseUrl}${userData.id}`).expect(401);
  });
  test('should return nothing if no authorization', async () => {
    const result = await api.get(`${baseUrl}${userData.id}`);
    expect(result.body).toMatchObject({});
  });
  test('should return 404 if wrong id', async () => {
    await api.get(`${baseUrl}423432`).set('Authorization', jwt).expect(404);
  });
  test('should return nothing if wrong id', async () => {
    const result = await api.get(`${baseUrl}423432`).set('Authorization', jwt);
    expect(result.body).toMatchObject({});
  });
});

describe('updating user info', () => {
  const baseUrl = '/api/users/';
  const updateFields = { lastName: 'updatedLastName', firstName: 'updatedFirstName' };
  test('should return 200 if updating current user', async () => {
    await api
      .put(`${baseUrl}${userData.id}`)
      .set('Authorization', jwt)
      .send(updateFields)
      .expect(200);
  });
  test('should return updated userInfo if updating current user', async () => {
    const result = await api
      .put(`${baseUrl}${userData.id}`)
      .set('Authorization', jwt)
      .send(updateFields);
    expect(result.body.firstName).toBe(updateFields.firstName);
    expect(result.body.lastName).toBe(updateFields.lastName);
  });
  test('should actually update userinfo in the db', async () => {
    await api.put(`${baseUrl}${userData.id}`).set('Authorization', jwt).send(updateFields);
    const result = await userInfoService.findUserInfo(userData.id);
    console.log(result);
    expect(result.firstName).toBe(updateFields.firstName);
    expect(result.lastName).toBe(updateFields.lastName);
  });
  test('should return 401 if no authorization', async () => {
    await api.put(`${baseUrl}${userData.id}`).send(updateFields).expect(401);
  });
  test('should return nothing if no authorization', async () => {
    const result = await api.put(`${baseUrl}${userData.id}`).send(updateFields);
    expect(result.body).toMatchObject({});
  });
  test('should return 403 if not current id', async () => {
    await api.put(`${baseUrl}4444444444`).set('Authorization', jwt).send(updateFields).expect(403);
  });
  test('should return nothing if not current id', async () => {
    const result = await api
      .put(`${baseUrl}4444444444}`)
      .set('Authorization', jwt)
      .send(updateFields);
    expect(result.body).toMatchObject({});
  });
});
