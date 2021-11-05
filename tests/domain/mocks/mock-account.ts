import { AddAccount } from '@/domain/usecases';

import faker from 'faker';

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
