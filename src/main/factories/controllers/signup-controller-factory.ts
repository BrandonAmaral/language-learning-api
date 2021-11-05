import { SignUpController } from '@/presentation/controllers';
import { Controller } from '@/presentation/contracts';
import { makeDbAddAccount, makeSignUpValidation } from '@/main/factories';

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation());
};
