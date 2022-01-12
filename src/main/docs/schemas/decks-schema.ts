export const decksSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/deck',
  },
};
