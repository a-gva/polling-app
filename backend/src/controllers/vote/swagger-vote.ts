export const voteSwagger = {
  '/vote/{id}': {
    post: {
      tags: ['/vote/{id}'],
      summary: 'Create a new vote for a poll',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                vote: {
                  type: 'number',
                },
              },
              required: ['vote'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'The list of the polls',
        },
      },
    },
  },
};
