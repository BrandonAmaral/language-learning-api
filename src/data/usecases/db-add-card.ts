import { AddCard } from '@/domain/usecases';
import { AddCardRepository } from '@/data/contracts';

export class DbAddCard implements AddCard {
  constructor(private readonly addCardRepository: AddCardRepository) {}

  async add(data: AddCard.Params): Promise<AddCard.Result> {
    await this.addCardRepository.addCard(data);
  }
}
