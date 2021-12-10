import { Collection } from 'mongodb';
import FakeObjectId from 'bson-objectid';

import { MongoHelper, DeckMongoRepository } from '@/infra/db';
import {
  mockAddAccountParams,
  mockAddDeckParams,
  mockAddCardParams,
} from '@/tests/domain/mocks';
import { DeckModel } from '@/domain/models';

let accountCollection: Collection;
let deckCollection: Collection;

const makeSut = (): DeckMongoRepository => {
  return new DeckMongoRepository();
};

const mockDeck = async (): Promise<DeckModel> => {
  const createAccount = await accountCollection.insertOne(
    mockAddAccountParams(),
  );
  const createDeck = await deckCollection.insertOne({
    ...mockAddDeckParams(),
    owner: createAccount.insertedId,
  });
  const deck = await deckCollection.findOne({ _id: createDeck.insertedId });
  return MongoHelper.map(deck);
};

describe('DeckMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
    deckCollection = MongoHelper.getCollection('decks');
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

  describe('addCard()', () => {
    it('Should add a card on success', async () => {
      const sut = makeSut();
      const deck = await mockDeck();
      const { front, back } = mockAddCardParams();
      await sut.addCard({ front, back, deckId: deck.id });
      const created = await deckCollection.findOne({ _id: deck.id });
      expect(created.cards).toBeTruthy();
    });
  });

  describe('checkByOwnerId()', () => {
    it('Should return true if user is the owner of the deck', async () => {
      const sut = makeSut();
      const deck = await mockDeck();
      const exists = await sut.checkByOwnerId(deck.id, deck.owner);
      expect(exists).toBe(true);
    });

    it('Should return false if user is not the owner of the deck', async () => {
      const sut = makeSut();
      const deck = await mockDeck();
      const exists = await sut.checkByOwnerId(
        deck.id,
        new FakeObjectId().toHexString(),
      );
      expect(exists).toBe(false);
    });
  });
});
