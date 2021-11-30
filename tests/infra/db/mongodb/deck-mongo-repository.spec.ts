import { Collection } from 'mongodb';

import { MongoHelper, DeckMongoRepository } from '@/infra/db';
import { mockAddDeckParams } from '@/tests/domain/mocks';

const makeSut = (): DeckMongoRepository => {
  return new DeckMongoRepository();
};

let deckCollection: Collection;

describe('DeckMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    deckCollection = await MongoHelper.getCollection('decks');
    await deckCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('add()', () => {
    it('Should add a deck on success', async () => {
      const sut = makeSut();
      await sut.add(mockAddDeckParams());
      const count = await deckCollection.countDocuments();
      expect(count).toBe(1);
    });
  });
});
