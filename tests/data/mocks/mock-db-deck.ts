import {
  AddDeckRepository,
  AddCardRepository,
  CheckDeckByOwnerIdRepository,
  LoadDecksRepository,
} from '@/data/contracts';
import { mockDeckModel } from '@/tests/domain/mocks';

export class AddDeckRepositorySpy implements AddDeckRepository {
  params: AddDeckRepository.Params;

  async add(data: AddDeckRepository.Params): Promise<AddDeckRepository.Result> {
    this.params = data;
  }
}

export class AddCardRepositorySpy implements AddCardRepository {
  params: AddCardRepository.Params;

  async addCard(
    data: AddCardRepository.Params,
  ): Promise<AddCardRepository.Result> {
    this.params = data;
  }
}

export class CheckDeckByOwnerIdRepositorySpy
  implements CheckDeckByOwnerIdRepository
{
  deckId: string;
  accountId: string;
  result = true;

  async checkByOwnerId(
    deckId: string,
    accountId: string,
  ): Promise<CheckDeckByOwnerIdRepository.Result> {
    this.deckId = deckId;
    this.accountId = accountId;
    return this.result;
  }
}

export class LoadDecksRepositorySpy implements LoadDecksRepository {
  accountId: string;
  result = mockDeckModel();

  async load(accountId: string): Promise<LoadDecksRepository.Result> {
    this.accountId = accountId;
    return this.result;
  }
}
