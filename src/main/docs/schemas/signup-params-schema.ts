export const signUpParamsSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    passwordConfirmation: {
      type: 'string',
    },
  },
  required: ['username', 'email', 'password', 'passwordConfirmation'],
};
