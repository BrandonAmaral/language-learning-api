import {
  AddDeck,
  AddCard,
  CheckDeckByOwnerId,
  LoadDecks,
} from '@/domain/usecases';
import { mockDeckModel } from '@/tests/domain/mocks';

export class AddDeckSpy implements AddDeck {
  params: AddDeck.Params;

  async add(params: AddDeck.Params): Promise<AddDeck.Result> {
    this.params = params;
  }
}

export class AddCardSpy implements AddCard {
  params: AddCard.Params;

  async add(params: AddCard.Params): Promise<AddCard.Result> {
    this.params = params;
  }
}

export class CheckDeckByOwnerIdSpy implements CheckDeckByOwnerId {
  deckId: string;
  accountId: string;
  result = true;

  async checkByOwnerId(
    deckId: string,
    accountId: string,
  ): Promise<CheckDeckByOwnerId.Result> {
    this.deckId = deckId;
    this.accountId = accountId;
    return this.result;
  }
}

export class LoadDecksSpy implements LoadDecks {
  accountId: string;
  result = mockDeckModel();

  async load(accountId: string): Promise<LoadDecks.Result> {
    this.accountId = accountId;
    return this.result;
  }
}
