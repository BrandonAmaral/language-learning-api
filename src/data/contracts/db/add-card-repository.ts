import { AddCard } from '@/domain/usecases';

export interface AddCardRepository {
  addCard: (
    card: AddCardRepository.Params,
  ) => Promise<AddCardRepository.Result>;
}

export namespace AddCardRepository {
  export type Params = AddCard.Params;
  export type Result = AddCard.Result;
}
