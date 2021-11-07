import faker from 'faker';
import { Collection } from 'mongodb';

import { AccountMongoRepository, MongoHelper } from '@/infra/db';
import { mockAddAccountParams } from '@/tests/domain/mocks';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

let accountCollection: Collection;

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('add()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut();
      const data = mockAddAccountParams();
      const isValid = await sut.add(data);
      expect(isValid).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    it('Should return true if email is valid', async () => {
      const sut = makeSut();
      const data = mockAddAccountParams();
      await accountCollection.insertOne(data);
      const exists = await sut.checkByEmail(data.email);
      expect(exists).toBe(true);
    });

    it('Should return false if email is not valid', async () => {
      const sut = makeSut();
      const data = mockAddAccountParams();
      await accountCollection.insertOne(data);
      const exists = await sut.checkByEmail(faker.internet.email());
      expect(exists).toBe(false);
    });
  });

  describe('loadByEmail()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountCollection.insertOne(addAccountParams);
      const account = await sut.loadByEmail(addAccountParams.email);
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.username).toBeTruthy();
      expect(account.password).toBe(addAccountParams.password);
    });

    it('Should return null if loadByEmail fails', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountCollection.insertOne(addAccountParams);
      const account = await sut.loadByEmail(faker.internet.email());
      expect(account).toBeFalsy();
    });
  });

  describe('updateToken()', () => {
    it('Should update the account token on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountCollection.insertOne(addAccountParams);
      const fakeAccount = await accountCollection.findOne({
        email: addAccountParams.email,
      });
      expect(fakeAccount.token).toBeFalsy();
      const token = faker.datatype.uuid();
      await sut.updateToken(fakeAccount._id, token);
      const account = await accountCollection.findOne({ _id: fakeAccount._id });
      expect(account).toBeTruthy();
      expect(account.token).toBe(token);
    });
  });
});
