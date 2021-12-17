import { LoadDecks } from '@/domain/usecases';
import { Controller, HttpResponse } from '@/presentation/contracts';
import { ok, serverError, noContent } from '@/presentation/helpers';

export class LoadDecksController implements Controller {
  constructor(private readonly loadDecks: LoadDecks) {}

  async handle(request: LoadDecksController.Request): Promise<HttpResponse> {
    try {
      const decks = await this.loadDecks.load(request.accountId);
      return decks.length ? ok(decks) : noContent();
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace LoadDecksController {
  export type Request = {
    accountId: string;
  };
}
