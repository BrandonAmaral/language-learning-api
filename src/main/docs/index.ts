import paths from '@/main/docs/paths';
import schemas from '@/main/docs/schemas';
import components from '@/main/docs/components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Language Learning API',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
      description: 'Main Server',
    },
  ],
  tags: [
    {
      name: 'Accounts',
      description: 'Account related APIs',
    },
    {
      name: 'Decks',
      description: 'Deck related APIs',
    },
  ],
  paths,
  schemas,
  components,
};
