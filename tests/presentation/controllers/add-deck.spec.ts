import faker from 'faker';
import MockDate from 'mockdate';

import { AddDeckController } from '@/presentation/controllers';
import { AddDeckSpy, ValidationSpy } from '@/tests/presentation/mocks';
import { noContent, serverError, badRequest } from '@/presentation/helpers';
import { MissingParamError } from '@/presentation/errors';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): AddDeckController.Params => ({
  title: faker.random.words(),
  isPublic: true,
});

type SutTypes = {
  sut: AddDeckController;
  addDeckSpy: AddDeckSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const addDeckSpy = new AddDeckSpy();
  const validationSpy = new ValidationSpy();
  const sut = new AddDeckController(addDeckSpy, validationSpy);
  return {
    sut,
    addDeckSpy,
    validationSpy,
  };
};

describe('AddDeck Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const request = mockRequest();
    const response = await sut.handle(request);
    expect(response).toEqual(noContent());
  });

  it('Should call AddDeck with correct values', async () => {
    const { sut, addDeckSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addDeckSpy.params).toEqual({
      ...request,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  });

  it('Should return 500 if AddDeck fails', async () => {
    const { sut, addDeckSpy } = makeSut();
    jest.spyOn(addDeckSpy, 'add').mockImplementationOnce(throwError);
    const request = mockRequest();
    const response = await sut.handle(request);
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
});
