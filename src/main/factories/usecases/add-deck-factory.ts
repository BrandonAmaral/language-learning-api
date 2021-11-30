import { DbAddDeck } from '@/data/usecases';
import { AddDeck } from '@/domain/usecases';
import { DeckMongoRepository } from '@/infra/db';

export const makeAddDeck = (): AddDeck => {
  const addDeckRepository = new DeckMongoRepository();
  return new DbAddDeck(addDeckRepository);
};
