import { InvalidParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/contracts';
import { EmailValidator } from '@/validation/contracts';

export class EmailValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error | void {
    const isValid = this.emailValidator.isValid(input[this.field]);
    if (!isValid) {
      return new InvalidParamError(this.field);
    }
  }
}
