import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/contracts';
import { makeAddCardValidation } from '@/main/factories/controllers';

jest.mock('@/validation/validators/validation-composite');

describe('SignInValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddCardValidation();
    const validations: Validation[] = [];
    for (const field of ['front', 'back']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
