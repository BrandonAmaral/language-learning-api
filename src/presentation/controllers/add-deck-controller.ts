import { AddDeck } from '@/domain/usecases';
import { Controller, HttpResponse, Validation } from '@/presentation/contracts';
import { noContent, serverError, badRequest } from '@/presentation/helpers';

export class AddDeckController implements Controller {
  constructor(
    private readonly addDeck: AddDeck,
    private readonly validation: Validation,
  ) {}

  async handle(request: AddDeckController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { title, isPublic, accountId } = request;
      await this.addDeck.add({
        title,
        isPublic,
        owner: accountId,
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
      return noContent();
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace AddDeckController {
  export type Request = {
    accountId: string;
    title: string;
    isPublic: boolean;
  };
}
