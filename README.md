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

## Features

- Real-time updates with Socket.IO
- RESTful API endpoints
- Swagger documentation
- Uses Express for server routing
- Caches poll data for performance

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js > v17
- npm

### Installing

1. Clone the repository: `git clone https://github.com/a-gva/polling-app.git`
2. Navigate into the project directory: `cd polling-app`
3. Install the dependencies: `npm install`
4. At the `backend` folder, start the server with: `npm dev`. The server will start running at `http://localhost:3000`.
5. At the `frontend` folder, start the server with: `npm dev`. The client will start running at `http://localhost:3001`.

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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

Please replace the placeholders with the actual links and information about your project.
