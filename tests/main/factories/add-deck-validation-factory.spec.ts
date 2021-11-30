import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/contracts';
import { makeAddDeckValidation } from '@/main/factories/controllers';

jest.mock('@/validation/validators/validation-composite');

describe('SignInValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddDeckValidation();
    const validations: Validation[] = [];
    for (const field of ['title', 'isPublic']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
