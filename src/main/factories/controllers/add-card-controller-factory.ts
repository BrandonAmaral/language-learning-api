import { Controller } from '@/presentation/contracts';
import { AddCardController } from '@/presentation/controllers';
import {
  makeAddCard,
  makeAddCardValidation,
  makeCheckDeckByOwnerId,
} from '@/main/factories';

export const makeAddCardController = (): Controller => {
  return new AddCardController(
    makeAddCard(),
    makeAddCardValidation(),
    makeCheckDeckByOwnerId(),
  );
};
