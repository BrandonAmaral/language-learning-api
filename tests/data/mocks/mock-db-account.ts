import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
} from '@/data/contracts';

export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailRepository
{
  email: string;
  result = false;

  async checkByEmail(
    email: string,
  ): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  account: AddAccountRepository.Params;
  result = true;

  async add(
    account: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    this.account = account;
    return this.result;
  }
}
