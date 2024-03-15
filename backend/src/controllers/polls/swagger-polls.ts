export const pollsSwagger = {
  '/poll': {
    get: {
      tags: ['/polls'],
      summary: 'Returns the list of all the polls',
      responses: {
        200: {
          description: 'The list of the polls',
        },
      },
    },
    post: {
      tags: ['/polls'],
      summary: 'Creates a new poll',
      responses: {
        201: {
          description: 'The created poll',
        },
      },
    },
  },
  '/polls/{id}': {
    get: {
      tags: ['/polls/{id}'],
      summary: 'Returns a specific poll',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
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
      tags: ['/polls/{id}'],
      summary: 'Deletes a poll',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
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
      tags: ['/polls/{id}'],
      summary: 'Updates a specific poll',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'The updated poll',
        },
      },
    },
  },
};
