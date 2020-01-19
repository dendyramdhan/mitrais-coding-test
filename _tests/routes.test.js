const request = require('supertest');
const config = require('../_configs/config.json');
const jwt = require('jsonwebtoken');
const app = require('../app');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: "ramdhandendy@gmail.com",
        firstName: "Dendy",
        lastName: "Ramdhan",
        password: "test123",
        passwordConfirmation: "test123",
        mobileNumber: "081289376509",
        gender: "male",
        dateOfBirth: "1998-01-18"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('error', null);
    expect(res.body).toHaveProperty('data.id');
  });

  it('should authenticate user', async () => {
    const res = await request(app)
      .post('/api/users/authenticate')
      .send({
        email: "ramdhandendy@gmail.com",
        password: "test123"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('error', null);
    expect(res.body).toHaveProperty('data.token');
  });

  it('should fetch a current user', async () => {
    const userId = 1;
    const token = jwt.sign({ sub: userId }, config.secret);
    const res = await request(app).get(`/api/users/current`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('error', null);
    expect(res.body).toHaveProperty('data');
  });

  it('should fetch a single user', async () => {
    const userId = 1;
    const token = jwt.sign({ sub: userId }, config.secret);
    const res = await request(app).get(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('error', null);
    expect(res.body).toHaveProperty('data');
  });

  it('should fetch all users', async () => {
    const userId = 1;
    const token = jwt.sign({ sub: userId }, config.secret);
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('error', null);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(1);
  });
});