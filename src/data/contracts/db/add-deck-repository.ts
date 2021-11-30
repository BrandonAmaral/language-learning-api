import { AddDeck } from '@/domain/usecases';

export interface AddDeckRepository {
  add: (deck: AddDeckRepository.Params) => Promise<AddDeckRepository.Result>;
}

export namespace AddDeckRepository {
  export type Params = AddDeck.Params;
  export type Result = AddDeck.Result;
}
