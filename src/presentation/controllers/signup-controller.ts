import { AddAccount, Authentication } from '@/domain/usecases';
import { Controller, HttpResponse, Validation } from '@/presentation/contracts';
import { ok, serverError, forbidden, badRequest } from '@/presentation/helpers';
import { EmailInUseError } from '@/presentation/errors';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { email, password, username } = request;
      const account = await this.addAccount.add({
        email,
        username,
        password,
      });
      if (!account) {
        return forbidden(new EmailInUseError());
      }
      const auth = await this.authentication.auth({
        email,
        password,
      });
      return ok(auth);
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
  };
}
