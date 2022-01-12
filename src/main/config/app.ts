import express from 'express';

import setupMiddlewares from '@/main/config/middlewares';
import setupRoutes from '@/main/config/routes';
import setupSwagger from '@/main/config/swagger';

export const setupApp = async (): Promise<express.Express> => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  setupSwagger(app);
  return app;
};
