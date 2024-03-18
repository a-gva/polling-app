export const populateSwagger = {
  '/populate/{id}': {
    post: {
      tags: ['/populate/{id}'],
      summary: 'Populate votes for a poll',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'quantity',
          required: true,
          schema: {
            type: 'integer',
            format: 'int32',
          },
        },
      ],
      responses: {
        200: {
          description: 'The list of the polls',
        },
      },
    },
  },
};
