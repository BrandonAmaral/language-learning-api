export const addDeckParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    isPublic: {
      type: 'boolean',
    },
  },
  required: ['title', 'isPublic'],
};
