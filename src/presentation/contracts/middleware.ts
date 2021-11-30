import { HttpResponse } from '@/presentation/contracts';

export interface Middleware<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
