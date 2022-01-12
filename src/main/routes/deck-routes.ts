import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import {
  makeAddDeckController,
  makeAddCardController,
  makeLoadDecksController,
} from '@/main/factories';
import { auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.post('/decks/add', auth, adaptRoute(makeAddDeckController()));
  router.get('/decks/load', auth, adaptRoute(makeLoadDecksController()));
  router.patch(
    '/decks/:deckId/add-card',
    auth,
    adaptRoute(makeAddCardController()),
  );
};
