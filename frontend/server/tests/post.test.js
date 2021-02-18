import supertest from 'supertest';
import app from '../app';
import sequelize from '../../sequelize';
import helper from './test_helper';

const { user } = sequelize.models;

const api = supertest(app);

let jwt;
let userData;

beforeEach(async () => {
  await user.destroy({ truncate: true, cascade: true });
  const newUser = await helper.generateTestJwt();
  jwt = newUser.jwt;
  userData = newUser.userData;
});
afterAll(async () => {
  await sequelize.close();
});

describe('getting posts', () => {
  const baseUrl = '/api/posts';
  test('should return 200 if correct id', async () => {
    const query = { userId: userData.id };
    await api.get(baseUrl).query(query).set('Authorization', jwt).expect(200);
  });
  test('should return first 10 posts by default', async () => {
    const query = { userId: userData.id };
    const result = await api.get(baseUrl).query(query).set('Authorization', jwt);
    expect(result.body).toHaveLength(10);
  });
  test('should return first 5 posts if set limit', async () => {
    const query = { userId: userData.id, limit: 5 };
    const result = await api.get(baseUrl).query(query).set('Authorization', jwt);
    console.log(result.body);
    expect(result.body).toHaveLength(5);
  });
  test('should return only posts after provided offset', async () => {
    const excludedPosts = userData.userInfo.profilePosts
      .filter((x, index) => index <= 5)
      .map((x) => x.name);
    const query = { userId: userData.id, offset: 5 };
    const result = await api.get(baseUrl).query(query).set('Authorization', jwt);
    expect(result.body).toHaveLength(6);
    expect(result.body.map((singlePost) => singlePost.name)).not.toContain(excludedPosts);
  });
  test('should return 400 if no id', async () => {
    await api.get(baseUrl).set('Authorization', jwt).expect(400);
  });
  test('should return 200 if correct id but no auth', async () => {
    const query = { userId: userData.id };
    await api.get(baseUrl).query(query).expect(401);
  });
});

describe('getting single post', () => {
  const baseUrl = '/api/posts';
  const id = 4234242;
  test('should return 200 if right id', async () => {
    await api.get(`${baseUrl}/${id}`).set('Authorization', jwt).expect(200);
  });
  test('should return that post if right id', async () => {
    const result = await api.get(`${baseUrl}/${id}`).set('Authorization', jwt);
    expect(result.body.text).toEqual(userData.userInfo.profilePosts[0].text);
  });
  test('should return 404 if wrong id', async () => {
    await api.get(`${baseUrl}/5353`).set('Authorization', jwt).expect(404);
  });
  test('should return nothing if wrong id', async () => {
    const result = await api.get(`${baseUrl}/534534534`).set('Authorization', jwt);
    expect(result.body).toMatchObject({});
  });
  test('should return 401 if no auth', async () => {
    await api.get(`${baseUrl}/${id}`).expect(401);
  });
});
