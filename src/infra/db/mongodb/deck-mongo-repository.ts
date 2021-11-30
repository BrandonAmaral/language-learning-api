import { AddDeckRepository } from '@/data/contracts';
import { MongoHelper } from '@/infra/db';

export class DeckMongoRepository implements AddDeckRepository {
  async add(data: AddDeckRepository.Params): Promise<AddDeckRepository.Result> {
    const deckCollection = MongoHelper.getCollection('decks');
    await deckCollection.insertOne(data);
  }
}
