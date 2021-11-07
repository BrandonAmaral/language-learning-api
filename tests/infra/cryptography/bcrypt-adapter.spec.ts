import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { throwError } from '@/tests/domain/mocks';

import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },

  async compare(): Promise<boolean> {
    return true;
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('Should call hash with correct values', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    it('Should return a valid hash on hash success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hash');
    });

    it('Should throw if hash throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError);
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('compare()', () => {
    it('Should call compare with correct values', async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    it('Should return true if compare succeeds', async () => {
      const sut = makeSut();
      const response = await sut.compare('any_value', 'any_value');
      expect(response).toBe(true);
    });

    it('Should return false if compare fails', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);
      const response = await sut.compare('any_value', 'any_hash');
      expect(response).toBe(false);
    });

    it('Should throw if compare throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError);
      const promise = sut.compare('any_value', 'any_hash');
      await expect(promise).rejects.toThrow();
    });
  });
});
