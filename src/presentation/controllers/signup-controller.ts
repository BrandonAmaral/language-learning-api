import { AddAccount } from '@/domain/usecases';
import { Controller, HttpResponse, Validation } from '@/presentation/contracts';
import { ok, serverError, forbidden, badRequest } from '@/presentation/helpers';
import { EmailInUseError } from '@/presentation/errors';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {}

  async handle(request: SignUpController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = request;
      const account = await this.addAccount.add({
        email,
        password,
      });
      if (!account) {
        return forbidden(new EmailInUseError());
      }
      return ok(account);
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace SignUpController {
  export type Params = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
