import { LoadDecks } from '@/domain/usecases';
import { LoadDecksRepository } from '@/data/contracts';

export class DbLoadDecks implements LoadDecks {
  constructor(private readonly loadDecksRepository: LoadDecksRepository) {}

  async load(accountId: string): Promise<LoadDecks.Result> {
    const decks = await this.loadDecksRepository.load(accountId);
    return decks;
  }
}
