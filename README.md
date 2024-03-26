# Real-time Polling App

This is a real-time polling application built with Next.js, Node.js, Express, and Socket.IO.

<img width="600" alt="image" src="https://github.com/a-gva/polling-app/assets/96698163/76d9c6cb-69e4-4899-bc42-7524e77a063f">

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [Zod](https://github.com/colinhacks/zod)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Turborepo](https://turbo.build/)

## Features

- Real-time updates with Socket.IO
- RESTful API endpoints
- Swagger documentation
- Uses Express for server routing
- Caches poll data for performance
- Data validations on interface layers with Zod

## Testing Features

- Unit tests with Jest
- Integration tests with Jest / SuperTest
- E2E tests with Cypress

## Design patterns applied

- MVC
- SOLID and DRY
- Clean Architecture
- Clean Code
- Event Driven Architecture

## API Workflow

<img width="900" alt="image" src="https://github.com/a-gva/polling-app/assets/96698163/d8fc09dd-a691-4a18-b3f1-ed7a7d1e289d">

## Client Workflow

<img width="900" alt="image" src="https://github.com/a-gva/polling-app/assets/96698163/2b0ee8cf-2a98-475f-81f0-92b3bae69a75">

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js > v17
- Docker

## Docker and Database Setup

This application uses Docker to run a PostgreSQL database. You need to have Docker installed on your machine to follow these instructions.

### Database Setup

1. Create a `.env` file in the `/db` directory of the project and set the necessary environment variables. Here's an example:

```properties
DB_IMAGE=postgres
DB_ACCESS_PORT=5432
DB_INTERNAL_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
```

## Backend Environment Variables

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

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
# DATABASE_URL="${CONNECTOR}://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_ACCESS_PORT}/${DB_NAME}?${ARGS}"

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

## Running all services at once

To run all services at once, you can use the following command from root:

1. Install all dependencies with:

```bash
yarn
```

2. Start all services with:

```bash
yarn dev
```

It should:

1. Start the database service in a Docker container;
2. Start the backend service, including the prisma service;
3. Start the frontend service

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs`.

<img width="600" alt="image" src="https://github.com/a-gva/polling-app/assets/96698163/85e6ef78-e027-4339-a20f-404c66e6c892">

## Running the tests

- All tests (except E2E): Run `yarn test` from root.

or...

- Unit tests: Run `yarn test` from either `/backend` or `/frontend`.
- Integration tests: Run `yarn test` from `/backend` directory.
- E2E tests: Run `yarn cypress:open` from `/frontend` directory.

## Google Lighthouse Metrics

<img width="400" alt="image" src="https://github.com/a-gva/polling-app/assets/96698163/d278aec0-1b9e-49f2-a8cf-1aef6994b9a5">
