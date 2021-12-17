import faker from 'faker';

import { DbLoadDecks } from '@/data/usecases';
import { LoadDecksRepositorySpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbLoadDecks;
  loadDecksRepositorySpy: LoadDecksRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadDecksRepositorySpy = new LoadDecksRepositorySpy();
  const sut = new DbLoadDecks(loadDecksRepositorySpy);
  return { sut, loadDecksRepositorySpy };
};

describe('DbLoadDecks Usecase', () => {
  it('Should return a list of Decks on success', async () => {
    const { sut, loadDecksRepositorySpy } = makeSut();
    const response = await sut.load(faker.datatype.uuid());
    expect(response).toEqual(loadDecksRepositorySpy.result);
  });

  it('Should call LoadDecksRepository with correct value', async () => {
    const { sut, loadDecksRepositorySpy } = makeSut();
    const accountId = faker.datatype.uuid();
    await sut.load(accountId);
    expect(loadDecksRepositorySpy.accountId).toBe(accountId);
  });

  it('Should throw if LoadDecksRepository throws', async () => {
    const { sut, loadDecksRepositorySpy } = makeSut();
    jest
      .spyOn(loadDecksRepositorySpy, 'load')
      .mockImplementationOnce(throwError);

    const promise = sut.load(faker.datatype.uuid());
    await expect(promise).rejects.toThrow();
  });
});
