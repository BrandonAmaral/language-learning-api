import { AddDeck } from '@/domain/usecases';
import { Controller, HttpResponse, Validation } from '@/presentation/contracts';
import { noContent, serverError, badRequest } from '@/presentation/helpers';

export class AddDeckController implements Controller {
  constructor(
    private readonly addDeck: AddDeck,
    private readonly validation: Validation,
  ) {}

  async handle(request: AddDeckController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      await this.addDeck.add({
        ...request,
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
  export type Params = {
    title: string;
    isPublic: boolean;
  };
}
