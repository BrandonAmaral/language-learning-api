export const deckSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    isPublic: {
      type: 'boolean',
    },
    owner: {
      type: 'string',
    },
    cards: {
      type: 'array',
      items: {
        $ref: '#/schemas/card',
      },
    },
  },
  required: ['title', 'isPublic', 'owner', 'cards'],
};
