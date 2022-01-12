import {
  signUpParamsSchema,
  accountSchema,
  errorSchema,
  signInParamsSchema,
  addDeckParamsSchema,
  addCardParamsSchema,
  deckSchema,
  decksSchema,
  cardSchema,
} from '@/main/docs/schemas/';

export default {
  signUpParams: signUpParamsSchema,
  signInParams: signInParamsSchema,
  account: accountSchema,
  error: errorSchema,
  card: cardSchema,
  deck: deckSchema,
  decks: decksSchema,
  addDeckParams: addDeckParamsSchema,
  addCardParams: addCardParamsSchema,
};
