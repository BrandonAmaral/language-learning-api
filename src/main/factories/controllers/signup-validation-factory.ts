import { EmailValidatorAdapter } from '@/infra/validators';
import { Validation } from '@/presentation/contracts';
import {
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
} from '@/validation/validators';
import { EmailValidation } from '@/validation/validators/email-validation';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  );
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
