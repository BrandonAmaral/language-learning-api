import { DeckModel } from '@/domain/models';

export interface LoadDecks {
  load: (accountId: string) => Promise<LoadDecks.Result>;
}

export namespace LoadDecks {
  export type Result = DeckModel[];
}
