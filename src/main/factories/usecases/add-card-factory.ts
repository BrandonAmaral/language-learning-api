import { DbAddCard } from '@/data/usecases';
import { AddCard } from '@/domain/usecases';
import { DeckMongoRepository } from '@/infra/db';

export const makeAddCard = (): AddCard => {
  const deckRepository = new DeckMongoRepository();
  return new DbAddCard(deckRepository);
};
