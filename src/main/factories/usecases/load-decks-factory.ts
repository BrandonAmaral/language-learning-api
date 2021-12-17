import { DbLoadDecks } from '@/data/usecases';
import { LoadDecks } from '@/domain/usecases';
import { DeckMongoRepository } from '@/infra/db';

export const makeDbLoadDecks = (): LoadDecks => {
  const deckRepository = new DeckMongoRepository();
  return new DbLoadDecks(deckRepository);
};
