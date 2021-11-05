import request from 'supertest';
import { Collection } from 'mongodb';

import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let accountCollection: Collection;

describe('Account Routes', () => {
  beforeAll(async () => {
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
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(200);

      await request(app)
        .post('/api/accounts/add')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(403);
    });
  });
});
