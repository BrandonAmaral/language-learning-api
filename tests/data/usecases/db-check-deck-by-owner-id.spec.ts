import faker from 'faker';

import { DbCheckDeckByOwnerId } from '@/data/usecases';
import { CheckDeckByOwnerIdRepositorySpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbCheckDeckByOwnerId;
  checkDeckByOwnerIdRepositorySpy: CheckDeckByOwnerIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const checkDeckByOwnerIdRepositorySpy = new CheckDeckByOwnerIdRepositorySpy();
  const sut = new DbCheckDeckByOwnerId(checkDeckByOwnerIdRepositorySpy);
  return { sut, checkDeckByOwnerIdRepositorySpy };
};

let deckId: string;
let accountId: string;

describe('DbCheckDeckOwnerById', () => {
  beforeEach(() => {
    deckId = faker.datatype.uuid();
    accountId = faker.datatype.uuid();
  });

  it('Should return true if CheckDeckOwnerByIdRepository returns true', async () => {
    const { sut } = makeSut();
    const exists = await sut.checkByOwnerId(deckId, accountId);
    expect(exists).toBe(true);
  });

  it('Should return false if CheckDeckOwnerByIdRepository returns false', async () => {
    const { sut, checkDeckByOwnerIdRepositorySpy } = makeSut();
    checkDeckByOwnerIdRepositorySpy.result = false;
    const exists = await sut.checkByOwnerId(deckId, accountId);
    expect(exists).toBe(false);
  });

  it('Should call CheckDeckOwnerByIdRepository', async () => {
    const { sut, checkDeckByOwnerIdRepositorySpy } = makeSut();
    await sut.checkByOwnerId(deckId, accountId);
    expect(checkDeckByOwnerIdRepositorySpy.deckId).toBe(deckId);
    expect(checkDeckByOwnerIdRepositorySpy.accountId).toBe(accountId);
  });

  it('Should throw if CheckDeckOwnerByIdRepository throws', async () => {
    const { sut, checkDeckByOwnerIdRepositorySpy } = makeSut();
    jest
      .spyOn(checkDeckByOwnerIdRepositorySpy, 'checkByOwnerId')
      .mockImplementationOnce(throwError);
    const promise = sut.checkByOwnerId(deckId, accountId);
    await expect(promise).rejects.toThrow();
  });
});
