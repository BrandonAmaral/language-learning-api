import { AddDeckRepository } from '@/data/contracts';

export class AddDeckRepositorySpy implements AddDeckRepository {
  params: AddDeckRepository.Params;

  async add(data: AddDeckRepository.Params): Promise<AddDeckRepository.Result> {
    this.params = data;
  }
}
