import MockDate from 'mockdate';

import { DbAddDeck } from '@/data/usecases';
import { AddDeckRepositorySpy } from '@/tests/data/mocks';
import { mockAddDeckParams, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAddDeck;
  addDeckRepositorySpy: AddDeckRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addDeckRepositorySpy = new AddDeckRepositorySpy();
  const sut = new DbAddDeck(addDeckRepositorySpy);
  return { sut, addDeckRepositorySpy };
};

describe('DbAddDeck Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call AddDeckRepository with correct values', async () => {
    const { sut, addDeckRepositorySpy } = makeSut();
    const data = mockAddDeckParams();
    await sut.add(data);
    expect(addDeckRepositorySpy.params).toEqual(data);
  });

  it('Should throw if AddDeckRepository throws', async () => {
    const { sut, addDeckRepositorySpy } = makeSut();
    jest.spyOn(addDeckRepositorySpy, 'add').mockImplementationOnce(throwError);
    const result = sut.add(mockAddDeckParams());
    await expect(result).rejects.toThrow();
  });
});
