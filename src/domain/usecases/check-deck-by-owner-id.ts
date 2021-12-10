export interface CheckDeckByOwnerId {
  checkByOwnerId: (
    deckId: string,
    accountId: string,
  ) => Promise<CheckDeckByOwnerId.Result>;
}

export namespace CheckDeckByOwnerId {
  export type Result = boolean;
}
