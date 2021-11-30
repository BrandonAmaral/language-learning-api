import { DeckModel } from '@/domain/models';

export interface AddDeck {
  add: (params: AddDeck.Params) => Promise<AddDeck.Result>;
}

export namespace AddDeck {
  export type Params = Omit<DeckModel, 'id'>;
  export type Result = void;
}
