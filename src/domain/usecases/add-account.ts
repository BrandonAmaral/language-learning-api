export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = boolean;
}
