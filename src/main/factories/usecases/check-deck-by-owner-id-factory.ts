import { DbCheckDeckByOwnerId } from '@/data/usecases';
import { CheckDeckByOwnerId } from '@/domain/usecases';
import { DeckMongoRepository } from '@/infra/db';

export const makeCheckDeckByOwnerId = (): CheckDeckByOwnerId => {
  const deckRepository = new DeckMongoRepository();
  return new DbCheckDeckByOwnerId(deckRepository);
};
