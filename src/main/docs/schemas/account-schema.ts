export const accountSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
  },
  required: ['token', 'username'],
};
