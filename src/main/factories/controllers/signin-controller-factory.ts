import { SignInController } from '@/presentation/controllers';
import { Controller } from '@/presentation/contracts';
import { makeSignInValidation, makeDbAuthentication } from '@/main/factories';

export const makeSignInController = (): Controller => {
  return new SignInController(makeSignInValidation(), makeDbAuthentication());
};
