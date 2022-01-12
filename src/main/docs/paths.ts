import {
  signUpPath,
  signInPath,
  addDeckPath,
  addCardPath,
  loadDecksPath,
} from '@/main/docs/paths/';

export default {
  '/accounts/add': signUpPath,
  '/accounts/auth': signInPath,
  '/decks/add': addDeckPath,
  '/decks/load': loadDecksPath,
  '/decks/{deckId}/add-card': addCardPath,
};
