import { Controller } from '@/presentation/contracts';
import { AddDeckController } from '@/presentation/controllers';
import { makeAddDeck, makeAddDeckValidation } from '@/main/factories';

export const makeAddDeckController = (): Controller => {
  return new AddDeckController(makeAddDeck(), makeAddDeckValidation());
};
