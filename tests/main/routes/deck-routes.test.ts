import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { Collection, ObjectId } from 'mongodb';

import env from '@/main/config/env';
import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let deckCollection: Collection;
let accountCollection: Collection;
let app: Express;

type MockAccount = {
  token: string;
  id: string;
};

const mockAccount = async (): Promise<MockAccount> => {
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
  return { token, id: res.insertedId.toHexString() };
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
      const { token } = await mockAccount();
      await request(app)
        .post('/api/decks')
        .set('x-access-token', token)
        .send({
          title: 'any_name',
          isPublic: true,
        })
        .expect(204);
    });

    it('Should return 403 on add deck without token', async () => {
      await request(app)
        .post('/api/decks')
        .send({
          title: 'any_name',
          isPublic: true,
        })
        .expect(403);
    });
  });

  describe('GET /decks', () => {
    it('Should return 200 on load Decks with valid token', async () => {
      const { token, id } = await mockAccount();
      await deckCollection.insertOne({
        title: 'any_title',
        public: true,
        owner: new ObjectId(id),
      });
      await request(app)
        .get('/api/decks')
        .set('x-access-token', token)
        .expect(200);
    });

    it('Should return 403 on load Decks without token', async () => {
      await request(app).get('/api/decks').expect(403);
    });
  });

  describe('PATCH /decks/:deckId/cards', () => {
    it('Should return 204 on add card with valid token', async () => {
      const { token, id } = await mockAccount();
      const deck = await deckCollection.insertOne({
        title: 'any_title',
        public: true,
        owner: new ObjectId(id),
      });
      await request(app)
        .patch(`/api/decks/${deck.insertedId.toHexString()}/cards`)
        .set('x-access-token', token)
        .send({
          front: {
            phrase: 'any_phrase',
          },
          back: {
            translation: 'any_translation',
          },
        })
        .expect(204);
    });

    it('Should return 403 on add card without token', async () => {
      const { id } = await mockAccount();
      const deck = await deckCollection.insertOne({
        title: 'any_title',
        public: true,
        owner: new ObjectId(id),
      });
      await request(app)
        .patch(`/api/decks/${deck.insertedId.toHexString()}/cards`)
        .send({
          front: {
            phrase: 'any_phrase',
          },
          back: {
            translation: 'any_translation',
          },
        })
        .expect(403);
    });
  });
});
