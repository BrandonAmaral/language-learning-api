import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeAddDeckController } from '@/main/factories';
import { auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.post('/decks/add', auth, adaptRoute(makeAddDeckController()));
};
