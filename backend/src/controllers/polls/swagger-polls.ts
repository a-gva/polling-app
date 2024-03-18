export const pollsSwagger = {
  '/poll': {
    get: {
      tags: ['/poll'],
      summary: 'Returns the list of all the polls',
      responses: {
        200: {
          description: 'The list of the polls',
        },
      },
    },
    post: {
      tags: ['/poll'],
      summary: 'Creates a new poll',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                question: {
                  type: 'string',
                },
                options: {
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 2,
                },
              },
              required: ['options'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'The created poll',
        },
      },
    },
  },
  '/poll/{id}': {
    get: {
      tags: ['/poll/{id}'],
      summary: 'Returns a specific poll',
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
      responses: {
        200: {
          description: 'The requested poll',
        },
      },
    },
    delete: {
      tags: ['/poll/{id}'],
      summary: 'Deletes a poll',
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
      responses: {
        200: {
          description: 'The deleted poll',
        },
      },
    },
    patch: {
      tags: ['/poll/{id}'],
      summary: 'Updates a specific poll',
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
                question: {
                  type: 'string',
                },
                options: {
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 2,
                },
              },
              required: ['question', 'options'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'The updated poll',
        },
      },
    },
  },
};
