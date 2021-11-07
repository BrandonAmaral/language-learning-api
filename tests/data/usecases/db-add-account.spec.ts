import { DbAddAccount } from '@/data/usecases';
import {
  CheckAccountByEmailRepositorySpy,
  HasherSpy,
  AddAccountRepositorySpy,
} from '@/tests/data/mocks';
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAddAccount;
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy;
  hasherSpy: HasherSpy;
  addAccountRepositorySpy: AddAccountRepositorySpy;
};

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy =
    new CheckAccountByEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const addAccountRepositorySpy = new AddAccountRepositorySpy();
  const sut = new DbAddAccount(
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy,
  );
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy,
  };
};

describe('DbAddAccount Usecase', () => {
  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const response = await sut.add(mockAddAccountParams());
    expect(response).toEqual(true);
  });

  it('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    checkAccountByEmailRepositorySpy.result = true;
    const response = await sut.add(mockAddAccountParams());
    expect(response).toEqual(false);
  });

  it('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut();
    const request = mockAddAccountParams();
    await sut.add(request);
    expect(hasherSpy.plaintext).toEqual(request.password);
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow();
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, hasherSpy, addAccountRepositorySpy } = makeSut();
    const request = mockAddAccountParams();
    await sut.add(request);
    expect(addAccountRepositorySpy.account).toEqual({
      email: request.email,
      username: request.username,
      password: hasherSpy.digest,
    });
  });

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut();
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError);
    const params = mockAddAccountParams();
    const promise = sut.add(params);
    expect(promise).rejects.toThrow();
  });
});
