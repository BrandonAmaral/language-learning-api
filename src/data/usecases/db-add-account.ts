import { AddAccount } from '@/domain/usecases';
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  Hasher,
} from '@/data/contracts';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    let isValid = false;
    const { email, password } = params;
    const exists = await this.checkAccountByEmailRepository.checkByEmail(email);
    if (!exists) {
      const hashedPassword = await this.hasher.hash(password);
      isValid = await this.addAccountRepository.add({
        ...params,
        password: hashedPassword,
      });
    }
    return isValid;
  }
}
