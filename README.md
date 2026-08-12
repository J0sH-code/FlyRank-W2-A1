# FlyRank BE01 Task API

This project is an Express-based task API backed by PostgreSQL. It exposes CRUD-style routes for managing tasks and includes Swagger documentation for exploring the API.

## Tech stack

- Node.js + Express
- PostgreSQL via the `pg` client
- Swagger UI for API docs
- Environment-based configuration using `.env`

## Prerequisites

Before running the app, make sure PostgreSQL is installed and running locally or on your configured host.

Create a `.env` file in the `BE01` folder with the following variables:

```env
HOST=localhost
USER=postgres
DB_PORT=5432
PASSWORD=your_postgres_password
DATABASE=flyrank
```

Update the values to match your PostgreSQL instance.

## Install and run

From the `BE01` directory, run:

```bash
npm install
npm start
```

The API will start on port 3000.

## Database connection

The app creates a PostgreSQL connection pool in `BE01/config/db.js` using the values from the `.env` file. The connection is initialized with `new Pool(...)` from the `pg` package.

## Swagger UI

Open the interactive documentation at:

```text
http://localhost:3000/docs/
```

![Swagger UI preview](swagger-screenshot.png)

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | / | Returns API info |
| GET | /health | Health check |
| GET | /tasks | List all tasks |
| GET | /tasks/{id} | Get one task by ID |
| POST | /tasks | Create a new task |
| PUT | /tasks/{id} | Update a task |
| DELETE | /tasks/{id} | Delete a task |

## Example request

```bash
curl -i http://localhost:3000/health
```

Example response:

```text
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 15

{"status":"ok"}
```

## Notes

- Data is stored in PostgreSQL rather than an in-memory array.
- Database configuration is managed through environment variables in the `.env` file.
- The OpenAPI definition is stored in [BE01/openapi.json](BE01/openapi.json).

