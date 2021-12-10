export interface CheckDeckByOwnerIdRepository {
  checkByOwnerId: (
    deckId: string,
    accountId: string,
  ) => Promise<CheckDeckByOwnerIdRepository.Result>;
}

export namespace CheckDeckByOwnerIdRepository {
  export type Result = boolean;
}
