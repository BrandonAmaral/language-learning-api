import { AddDeck } from '@/domain/usecases';

import faker from 'faker';

export const mockAddDeckParams = (): AddDeck.Params => ({
  title: faker.random.words(),
  isPublic: true,
  owner: faker.datatype.uuid(),
  createdAt: new Date(),
  modifiedAt: new Date(),
});
