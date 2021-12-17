import faker from 'faker';

import { LoadDecksController } from '@/presentation/controllers';
import { LoadDecksSpy } from '@/tests/presentation/mocks';
import { ok, noContent, serverError } from '@/presentation/helpers';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): LoadDecksController.Request => ({
  accountId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: LoadDecksController;
  loadDecksSpy: LoadDecksSpy;
};

const makeSut = (): SutTypes => {
  const loadDecksSpy = new LoadDecksSpy();
  const sut = new LoadDecksController(loadDecksSpy);
  return { sut, loadDecksSpy };
};

describe('LoadDecks Controller', () => {
  it('Should return 200 on success', async () => {
    const { sut, loadDecksSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(loadDecksSpy.result));
  });

  it('Should call LoadDecks with correct value', async () => {
    const { sut, loadDecksSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(loadDecksSpy.accountId).toEqual(request.accountId);
  });

  it('Should return 204 if LoadDecks returns empty', async () => {
    const { sut, loadDecksSpy } = makeSut();
    loadDecksSpy.result = [];
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(noContent());
  });

  it('Should return 500 if LoadDecks throws', async () => {
    const { sut, loadDecksSpy } = makeSut();
    jest.spyOn(loadDecksSpy, 'load').mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new Error()));
  });
});
