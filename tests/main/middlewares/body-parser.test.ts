import { Express } from 'express';
import request from 'supertest';

import { setupApp } from '@/main/config/app';

let app: Express;

describe('BodyParser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp();
  });

  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (request, response) => {
      return response.send(request.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ test: 'test' })
      .expect({ test: 'test' });
  });
});
