import faker from 'faker';

import { AddCard, AddDeck } from '@/domain/usecases';
import { DeckModel } from '@/domain/models';

export const mockAddDeckParams = (): AddDeck.Params => ({
  title: faker.random.words(),
  isPublic: true,
  owner: faker.datatype.uuid(),
  createdAt: new Date(),
  modifiedAt: new Date(),
});

export const mockAddCardParams = (): AddCard.Params => ({
  deckId: faker.datatype.uuid(),
  front: {
    phrase: faker.random.words(),
    howToRead: faker.random.words(),
  },
  back: {
    translation: faker.random.words(),
    glossary: {
      words: [faker.random.word()],
      meanings: [faker.random.word()],
    },
  },
});

export const mockDeckModel = (): DeckModel[] => [
  {
    id: faker.datatype.uuid(),
    owner: faker.datatype.uuid(),
    title: faker.random.words(),
    isPublic: true,
    createdAt: new Date(),
    modifiedAt: new Date(),
  },
];
