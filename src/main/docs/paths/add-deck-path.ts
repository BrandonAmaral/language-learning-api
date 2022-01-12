export const addDeckPath = {
  post: {
    tags: ['Decks'],
    summary: 'Add deck API',
    description: 'This route can only be executed by authenticated users',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addDeckParams',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Success, but no content',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
