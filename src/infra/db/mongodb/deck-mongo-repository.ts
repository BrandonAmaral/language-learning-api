import { ObjectId } from 'mongodb';

import {
  AddCardRepository,
  AddDeckRepository,
  CheckDeckByOwnerIdRepository,
} from '@/data/contracts';
import { MongoHelper } from '@/infra/db';

export class DeckMongoRepository
  implements AddDeckRepository, CheckDeckByOwnerIdRepository, AddCardRepository
{
  async add(data: AddDeckRepository.Params): Promise<AddDeckRepository.Result> {
    const deckCollection = MongoHelper.getCollection('decks');
    await deckCollection.insertOne(data);
  }

  async addCard(
    data: AddCardRepository.Params,
  ): Promise<AddCardRepository.Result> {
    const { deckId, front, back } = data;
    const deckCollection = MongoHelper.getCollection('decks');
    await deckCollection.updateOne(
      { _id: new ObjectId(deckId) },
      { $addToSet: { cards: { front, back } } },
    );
  }

  async checkByOwnerId(
    deckId: string,
    accountId: string,
  ): Promise<CheckDeckByOwnerIdRepository.Result> {
    const deckCollection = MongoHelper.getCollection('decks');
    const check = await deckCollection.findOne(
      {
        _id: new ObjectId(deckId),
        owner: new ObjectId(accountId),
      },
      { projection: { _id: 1, owner: 1 } },
    );
    return check !== null;
  }
}
