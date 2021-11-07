import { HttpResponse } from '@/presentation/contracts';
import { ServerError, UnauthorizedError } from '@/presentation/errors';

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200,
});

export const badRequest = (data: any): HttpResponse => ({
  body: data,
  statusCode: 400,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const forbidden = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 403,
});

export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack),
  statusCode: 500,
});
