import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeAddDeckController, makeAddCardController } from '@/main/factories';
import { auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.post('/decks', auth, adaptRoute(makeAddDeckController()));
  router.patch(
    '/decks/:deckId/cards',
    auth,
    adaptRoute(makeAddCardController()),
  );
};
