import { DbAddCard } from '@/data/usecases';
import { AddCardRepositorySpy } from '@/tests/data/mocks';
import { mockAddCardParams, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbAddCard;
  addCardRepositorySpy: AddCardRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addCardRepositorySpy = new AddCardRepositorySpy();
  const sut = new DbAddCard(addCardRepositorySpy);
  return { sut, addCardRepositorySpy };
};

describe('DbAddCard Usecase', () => {
  it('Should call AddCardRepository with correct values', async () => {
    const { sut, addCardRepositorySpy } = makeSut();
    const data = mockAddCardParams();
    await sut.add(data);
    expect(addCardRepositorySpy.params).toEqual(data);
  });

  it('Should throw if AddCardRepository throws', async () => {
    const { sut, addCardRepositorySpy } = makeSut();
    jest
      .spyOn(addCardRepositorySpy, 'addCard')
      .mockImplementationOnce(throwError);
    const result = sut.add(mockAddCardParams());
    await expect(result).rejects.toThrow();
  });
});
