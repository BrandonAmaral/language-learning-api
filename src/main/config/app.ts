import express from 'express';

import setupMiddlewares from '@/main/config/middlewares';
import setupRoutes from '@/main/config/routes';

export const setupApp = async (): Promise<express.Express> => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
