import { AddDeck } from '@/domain/usecases';
import { AddDeckRepository } from '@/data/contracts';

export class DbAddDeck implements AddDeck {
  constructor(private readonly addDeckRepository: AddDeckRepository) {}

  async add(data: AddDeck.Params): Promise<AddDeck.Result> {
    await this.addDeckRepository.add(data);
  }
}
