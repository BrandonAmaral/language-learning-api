import { ObjectId } from 'mongodb';

import {
  AddCardRepository,
  AddDeckRepository,
  CheckDeckByOwnerIdRepository,
  LoadDecksRepository,
} from '@/data/contracts';
import { MongoHelper, QueryBuilder } from '@/infra/db';

export class DeckMongoRepository
  implements
    AddDeckRepository,
    CheckDeckByOwnerIdRepository,
    AddCardRepository,
    LoadDecksRepository
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

  async load(accountId: string): Promise<LoadDecksRepository.Result> {
    const deckCollection = MongoHelper.getCollection('decks');
    const query = new QueryBuilder()
      .match({
        owner: new ObjectId(accountId),
      })
      .project({
        _id: 1,
        owner: 1,
        title: 1,
        cards: 1,
      })
      .build();
    const decks = await deckCollection.aggregate(query).toArray();
    return MongoHelper.mapCollection(decks);
  }
}
