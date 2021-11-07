import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/contracts';
import { makeSignUpValidation } from '@/main/factories/controllers';
import { EmailValidatorAdapter } from '@/infra/validators';

jest.mock('@/validation/validators/validation-composite');

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of [
      'email',
      'username',
      'password',
      'passwordConfirmation',
    ]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
