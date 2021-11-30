import 'module-alias/register';

import { MongoHelper } from '@/infra/db';
import env from '@/main/config/env';

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const { setupApp } = await import('./config/app');
    const app = await setupApp();
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    );
  })
  .catch(err => console.log(err));
