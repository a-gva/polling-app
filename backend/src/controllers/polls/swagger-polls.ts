export const pollsSwagger = {
  '/polls': {
    get: {
      tags: ['/polls'],
      summary: 'Returns the list of all the polls',
      responses: {
        200: {
          description: 'The list of the polls',
        },
      },
    },
    delete: {
      tags: ['/polls'],
      summary: 'Delete all polls',
      responses: {
        200: {
          description: 'The list of the polls',
        },
      },
    },
  },
};
