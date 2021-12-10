export interface AddCard {
  add: (params: AddCard.Params) => Promise<AddCard.Result>;
}

export namespace AddCard {
  export type Params = {
    deckId: string;
    front: {
      phrase: string;
      howToRead?: string;
    };
    back: {
      translation: string;
      glossary?: {
        words: string[];
        meanings: string[];
      };
    };
  };
  export type Result = void;
}
