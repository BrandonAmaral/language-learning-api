import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeSignUpController, makeSignInController } from '@/main/factories';

export default (router: Router): void => {
  router.post('/accounts/add', adaptRoute(makeSignUpController()));
  router.post('/accounts/auth', adaptRoute(makeSignInController()));
};
