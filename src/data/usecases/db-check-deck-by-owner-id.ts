import { CheckDeckByOwnerId } from '@/domain/usecases';
import { CheckDeckByOwnerIdRepository } from '@/data/contracts';

export class DbCheckDeckByOwnerId implements CheckDeckByOwnerId {
  constructor(
    private readonly checkDeckByOwnerIdRepository: CheckDeckByOwnerIdRepository,
  ) {}

  async checkByOwnerId(
    deckId: string,
    accountId: string,
  ): Promise<CheckDeckByOwnerIdRepository.Result> {
    return await this.checkDeckByOwnerIdRepository.checkByOwnerId(
      deckId,
      accountId,
    );
  }
}
