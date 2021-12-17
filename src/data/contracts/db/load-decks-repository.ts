import { DeckModel } from '@/domain/models';

export interface LoadDecksRepository {
  load: (accountId: string) => Promise<LoadDecksRepository.Result>;
}

export namespace LoadDecksRepository {
  export type Result = DeckModel[];
}
