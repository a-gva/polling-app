import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerDocsData } from './swaggerDocs';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Poll API',
      version: '1.0.0',
      description: 'A simple Express API for polls',
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PORT,
      },
    ],
    paths: swaggerDocsData, // Include the swaggerDocs object here
  },
  apis: ['./src/routes/*.ts'], // path to the API docs
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
