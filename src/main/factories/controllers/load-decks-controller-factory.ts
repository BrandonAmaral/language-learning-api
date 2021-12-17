import { Controller } from '@/presentation/contracts';
import { LoadDecksController } from '@/presentation/controllers';
import { makeDbLoadDecks } from '@/main/factories';

export const makeLoadDecksController = (): Controller => {
  return new LoadDecksController(makeDbLoadDecks());
};
