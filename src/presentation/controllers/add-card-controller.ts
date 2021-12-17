import { Controller, HttpResponse, Validation } from '@/presentation/contracts';
import { AddCard, CheckDeckByOwnerId } from '@/domain/usecases';
import {
  badRequest,
  serverError,
  noContent,
  forbidden,
} from '@/presentation/helpers';
import { AccessDeniedError } from '@/presentation/errors';

export class AddCardController implements Controller {
  constructor(
    private readonly addCard: AddCard,
    private readonly validation: Validation,
    private readonly checkDeckByOwnerId: CheckDeckByOwnerId,
  ) {}

  async handle(request: AddCardController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { deckId, accountId, front, back } = request;
      const check = await this.checkDeckByOwnerId.checkByOwnerId(
        deckId,
        accountId,
      );
      if (check) {
        await this.addCard.add({ front, back, deckId });
        return noContent();
      }
      return forbidden(new AccessDeniedError());
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace AddCardController {
  export type Request = {
    deckId: string;
    accountId: string;
    front: {
      phrase: string;
      howToRead?: string;
    };
    back: {
      translation: string;
      glossary?: {
        words: string[];
        meanings: string[];
      };
    };
  };
}
