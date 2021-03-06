import { EmailValidator } from '@/validation/contracts';

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true;
  email: string | undefined;

  isValid(email: string): boolean {
    this.email = email;
    return this.isEmailValid;
  }
}
