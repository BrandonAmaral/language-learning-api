import faker from 'faker';

import { DbLoadAccountByToken } from '@/data/usecases';
import {
  DecrypterSpy,
  LoadAccountByTokenRepositorySpy,
} from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterSpy: DecrypterSpy;
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy();
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositorySpy,
  );
  return { sut, decrypterSpy, loadAccountByTokenRepositorySpy };
};

let token: string;
let role: string;

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid();
    role = faker.random.word();
  });

  it('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut();
    await sut.load(token, role);
    expect(decrypterSpy.ciphertext).toBe(token);
  });

  it('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.plaintext = null;
    const response = await sut.load(token, role);
    expect(response).toBeNull();
  });

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
    const response = await sut.load(token, role);
    expect(response).toBeNull();
  });

  it('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    const response = await sut.load(token, role);
    expect(response).toEqual(loadAccountByTokenRepositorySpy.result);
  });

  it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    await sut.load(token, role);
    expect(loadAccountByTokenRepositorySpy.token).toBe(token);
    expect(loadAccountByTokenRepositorySpy.role).toBe(role);
  });

  it('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    loadAccountByTokenRepositorySpy.result = null;
    const response = await sut.load(token, role);
    expect(response).toBeNull();
  });

  it('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, 'loadByToken')
      .mockImplementationOnce(throwError);
    const response = sut.load(token, role);
    expect(response).rejects.toThrow();
  });
});
