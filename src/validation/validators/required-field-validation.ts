import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/contracts';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly field: string) {}

  validate(input: any): Error | void {
    if (!input[this.field]) {
      return new MissingParamError(this.field);
    }
  }
}
