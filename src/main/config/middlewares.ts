import { Express } from 'express';

import { bodyParser, cors } from '@/main/middlewares';

export default (app: Express): void => {
  app.use(cors);
  app.use(bodyParser);
};
