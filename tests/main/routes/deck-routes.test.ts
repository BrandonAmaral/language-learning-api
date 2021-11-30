import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { Collection } from 'mongodb';

import env from '@/main/config/env';
import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let deckCollection: Collection;
let accountCollection: Collection;
let app: Express;

const mockToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    email: 'any_email@mail.com',
    username: 'any_username',
    password: 'any_password',
  });
  const id = res.insertedId.toHexString();
  const token = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne(
    {
      _id: res.insertedId,
    },
    {
      $set: {
        token,
      },
    },
  );
  return token;
};

describe('Deck Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    deckCollection = MongoHelper.getCollection('decks');
    await deckCollection.deleteMany({});
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('POST /decks', () => {
    it('Should return 204 on add deck with valid token', async () => {
      const token = await mockToken();
      await request(app)
        .post('/api/decks/add')
        .set('x-access-token', token)
        .send({
          title: 'any_name',
          isPublic: true,
        })
        .expect(204);
    });

    it('Should return 403 on add deck without token', async () => {
      await request(app)
        .post('/api/decks/add')
        .send({
          title: 'any_name',
          isPublic: true,
        })
        .expect(403);
    });
  });
});
