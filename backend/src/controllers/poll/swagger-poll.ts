export const pollSwagger = {
  '/poll': {
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
      tags: ['/poll'],
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
    patch: {
      tags: ['/poll'],
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
    delete: {
      tags: ['/poll'],
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
  },
};
