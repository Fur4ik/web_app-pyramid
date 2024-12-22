import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Документация API',
    },
  },
  apis: ['../servises/server1.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
