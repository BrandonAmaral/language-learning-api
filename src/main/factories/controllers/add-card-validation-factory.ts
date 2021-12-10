import { Validation } from '@/presentation/contracts';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';

export const makeAddCardValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['front', 'back']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
