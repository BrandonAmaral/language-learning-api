import { AddAccount, Authentication } from '@/domain/usecases';

import faker from 'faker';

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
