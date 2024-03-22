export const votesSwagger = {
  '/votes': {
    get: {
      tags: ['/votes'],
      summary: 'Get the votes for all polls',
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
  '/votes/{id}': {
    get: {
      tags: ['/votes/{id}'],
      summary: 'Get the votes for a single poll',
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
