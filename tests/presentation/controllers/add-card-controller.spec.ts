import faker from 'faker';

import { AddCardController } from '@/presentation/controllers';
import {
  ValidationSpy,
  AddCardSpy,
  CheckDeckByOwnerIdSpy,
} from '@/tests/presentation/mocks';
import {
  noContent,
  badRequest,
  serverError,
  forbidden,
} from '@/presentation/helpers';
import { AccessDeniedError, MissingParamError } from '@/presentation/errors';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): AddCardController.Params => ({
  accountId: faker.datatype.uuid(),
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

type SutTypes = {
  sut: AddCardController;
  validationSpy: ValidationSpy;
  addCardSpy: AddCardSpy;
  checkDeckByOwnerIdSpy: CheckDeckByOwnerIdSpy;
};

const makeSut = (): SutTypes => {
  const addCardSpy = new AddCardSpy();
  const validationSpy = new ValidationSpy();
  const checkDeckByOwnerIdSpy = new CheckDeckByOwnerIdSpy();
  const sut = new AddCardController(
    addCardSpy,
    validationSpy,
    checkDeckByOwnerIdSpy,
  );
  return { sut, addCardSpy, validationSpy, checkDeckByOwnerIdSpy };
};

describe('AddCard Controller', () => {
  it('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(noContent());
  });

  it('Should call AddCard with correct values', async () => {
    const { sut, addCardSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addCardSpy.params).toEqual({
      deckId: request.deckId,
      front: request.front,
      back: request.back,
    });
  });

  it('Should return 500 if AddCard fails', async () => {
    const { sut, addCardSpy } = makeSut();
    jest.spyOn(addCardSpy, 'add').mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new Error()));
  });

  it('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError(faker.random.word());
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(badRequest(validationSpy.error));
  });

  it('Should call CheckDeckByOwnerId with correct values', async () => {
    const { sut, checkDeckByOwnerIdSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(checkDeckByOwnerIdSpy.accountId).toEqual(request.accountId);
    expect(checkDeckByOwnerIdSpy.deckId).toEqual(request.deckId);
  });

  it('Should return 403 if CheckDeckByOwnerId returns false', async () => {
    const { sut, checkDeckByOwnerIdSpy } = makeSut();
    checkDeckByOwnerIdSpy.result = false;
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should return 500 if CheckDeckByOwnerId fails', async () => {
    const { sut, checkDeckByOwnerIdSpy } = makeSut();
    jest
      .spyOn(checkDeckByOwnerIdSpy, 'checkByOwnerId')
      .mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new Error()));
  });
});
