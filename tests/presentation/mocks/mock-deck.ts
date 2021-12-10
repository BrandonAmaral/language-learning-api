import { AddDeck, AddCard, CheckDeckByOwnerId } from '@/domain/usecases';

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

  async checkByOwnerId(deckId: string, accountId: string) {
    this.deckId = deckId;
    this.accountId = accountId;
    return this.result;
  }
}
