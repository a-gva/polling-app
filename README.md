# Real-time Polling App

This is a real-time polling application built with Node.js, Express, and Socket.IO.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [Zod](https://github.com/colinhacks/zod)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Features

- Real-time updates with Socket.IO
- RESTful API endpoints
- Swagger documentation
- Uses Express for server routing
- Caches poll data for performance
- Data validations on interface layers with Zod

## Design patterns applied

- MVC
- SOLID and DRY
- Clean Architecture
- Clean Code

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js > v17
- npm

## Docker and Database Setup

This application uses Docker to run a PostgreSQL database. You need to have Docker installed on your machine to follow these instructions.

### Database Setup

1. Create a `.env` file in the root directory of the project and set the necessary environment variables. Here's an example:

```properties
DB_IMAGE=postgres
DB_ACCESS_PORT=5432
DB_INTERNAL_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
```

2: Run the following command to start the Docker container: `docker-compose up -d`

This command will start a PostgreSQL database in a Docker container.

To stop the Docker container, you can run: `docker-compose down`
Please replace the placeholders in the .env file with the actual values for your environment.

## Backed Environment Variables

The backend uses the following environment variables model:

```properties
PORT=3000

CONNECTOR=postgresql
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_NAME=postgres
DB_HOST=localhost
DB_ACCESS_PORT=5432
ARGS='schema=public'

DB_IMAGE=postgres
DB_INTERNAL_PORT=5432

DATABASE_URL="${CONNECTOR}://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_ACCESS_PORT}/${DB_NAME}?${ARGS}"

CACHE_TIMEOUT=60
DB_ROUNDTRIP_TIMEOUT=1
```

You can set these variables in a .env file in the backend directory. The Node.js server will load these variables at runtime.

Please replace the placeholders with the actual values for your environment.

## Frontend Environment Variables

The backend uses the following environment variables model:

```properties
DB_IMAGE=postgres
DB_ACCESS_PORT=5432
DB_INTERNAL_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
```

You can set these variables in a .env file in the frontend directory. The Next.js server will load these variables at runtime.

Please replace the placeholders with the actual values for your environment.

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs`.

## Running the tests

Run `npm test` to execute the unit tests.
