import { Express } from 'express';
import request from 'supertest';
import { Collection } from 'mongodb';
import { hash } from 'bcrypt';

import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let accountCollection: Collection;
let app: Express;

describe('Account Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('POST /add', () => {
    it('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/accounts/add')
        .send({
          email: 'any_email@mail.com',
          username: 'any_username',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(200);

      await request(app)
        .post('/api/accounts/add')
        .send({
          email: 'any_email@mail.com',
          username: 'any_username',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(403);
    });
  });

  describe('POST /login', () => {
    it('Should return 200 on authentication', async () => {
      const password = await hash('any_password', 12);
      await accountCollection.insertOne({
        username: 'any_username',
        email: 'any_email@mail.com',
        password,
      });
      await request(app)
        .post('/api/accounts/auth')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(200);
    });

    it('Should return 401 on authentication', async () => {
      await request(app)
        .post('/api/accounts/auth')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(401);
    });
  });
});
