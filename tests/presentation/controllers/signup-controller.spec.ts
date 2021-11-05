import faker from 'faker';

import { SignUpController } from '@/presentation/controllers';
import { AddAccountSpy, ValidationSpy } from '@/tests/presentation/mocks';
import { forbidden, ok, serverError, badRequest } from '@/presentation/helpers';
import {
  EmailInUseError,
  ServerError,
  MissingParamError,
} from '@/presentation/errors';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): SignUpController.Params => {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

type SutTypes = {
  sut: SignUpController;
  addAccountSpy: AddAccountSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy();
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(addAccountSpy, validationSpy);
  return { sut, addAccountSpy, validationSpy };
};

describe('SignUp Controller', () => {
  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(true));
  });

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(addAccountSpy.params).toEqual({
      email: request.email,
      password: request.password,
    });
  });

  it('Should return 403 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut();
    addAccountSpy.result = false;
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(forbidden(new EmailInUseError()));
  });

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut();
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new ServerError(null)));
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
