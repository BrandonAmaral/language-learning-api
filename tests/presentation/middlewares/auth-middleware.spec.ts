import { AuthMiddleware } from '@/presentation/middlewares';
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks';
import { AccessDeniedError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): AuthMiddleware.Request => ({
  token: 'any_token',
});

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenSpy: LoadAccountByTokenSpy;
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy();
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role);
  return { sut, loadAccountByTokenSpy };
};

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role';
    const { sut, loadAccountByTokenSpy } = makeSut(role);
    const request = mockRequest();
    await sut.handle(request);
    expect(loadAccountByTokenSpy.token).toBe(request.token);
    expect(loadAccountByTokenSpy.role).toBe(role);
  });

  it('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    loadAccountByTokenSpy.result = null;
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(
      ok({ accountId: loadAccountByTokenSpy.result.id }),
    );
  });

  it('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    jest
      .spyOn(loadAccountByTokenSpy, 'load')
      .mockImplementationOnce(throwError);
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(serverError(new Error()));
  });
});
