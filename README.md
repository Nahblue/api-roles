# API NestJS with PostgreSQL and Prisma

## Description

This is an API built with NestJS that uses PostgreSQL as the database and Prisma as the ORM to interact with the database. It provides endpoints to perform CRUD operations on a "roles" entity.

## Requirements

- Node.js
- Docker
- Docker Compose

## Installation

```bash
git clone https://github.com/Nahblue/api-roles
cd api-roles
npm install
```
Database Configuration:

This project uses Docker and Docker Compose to manage PostgreSQL. Make sure you have Docker installed and running on your system.

1.Rename the .env.example file to .env and configure the environment variables as needed.

2.Run the following command to start PostgreSQL using Docker Compose:
```bash
docker-compose up -d
```
3.Execute migrations
```bash
npx prisma migrate dev
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

The API is available at `http://localhost:3000`

Made with ♥ by Nahblue 😋
