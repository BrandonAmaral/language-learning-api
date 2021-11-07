import { EmailValidatorAdapter } from '@/infra/validators';
import { Validation } from '@/presentation/contracts';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';

export const makeSignInValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};