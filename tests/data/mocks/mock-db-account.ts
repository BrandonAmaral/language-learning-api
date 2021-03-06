import faker from 'faker';

import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateTokenRepository,
  LoadAccountByTokenRepository,
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

export class LoadAccountByEmailRepositorySpy
  implements LoadAccountByEmailRepository
{
  email: string;
  result = {
    id: faker.datatype.uuid(),
    username: faker.name.findName(),
    password: faker.internet.password(),
  };

  async loadByEmail(
    email: string,
  ): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class UpdateTokenRepositorySpy implements UpdateTokenRepository {
  id: string;
  token: string;

  async updateToken(id: string, token: string): Promise<void> {
    this.id = id;
    this.token = token;
  }
}

export class LoadAccountByTokenRepositorySpy
  implements LoadAccountByTokenRepository
{
  token: string;
  role: string;
  result = {
    id: faker.datatype.uuid(),
  };

  async loadByToken(
    token: string,
    role?: string,
  ): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token;
    this.role = role;
    return this.result;
  }
}
