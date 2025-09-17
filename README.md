# SECFB API

A REST API for SEC college football data, built with NestJS and TypeScript.

## Overview

The SECFB API provides a backend service for managing college football data including teams, games, seasons, and stadiums. This API supports applications that need SEC football information with full CRUD operations.

> Replaces the outdated [sec-web-backend](https://github.com/jcbura/sec-web-backend) repository.

## Features

### Core Functionality

- **Teams Management**: Team profiles with logos, conference info, and season stats
- **Seasons Management**: Multi-year season tracking with current season indicators
- **Stadiums Management**: Stadium information including capacity, location, and team associations
- **Games Management**: Game scheduling, results, and participant tracking
- **Admin Authentication**: JWT-based authentication with refresh token support

### Technical Features

- **Rate Limiting**: Built-in request throttling
- **API Documentation**: Auto-generated Swagger/OpenAPI docs
- **Data Validation**: Input validation with class-validator
- **Database Management**: Prisma ORM with PostgreSQL
- **Soft Deletes**: Safe data deletion with restore capabilities
- **CORS Support**: Cross-origin resource sharing
- **Structured Responses**: Consistent API response format
- **Security**: Bcrypt password hashing, signed cookies, JWT tokens

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Passport.js](https://www.passportjs.org/) with JWT
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)
- **Code Quality**: ESLint, Prettier, Husky, Commitlint

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secfb-api.git
cd secfb-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Database Services

Start the PostgreSQL database using Docker Compose:

```bash
docker compose up -d
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following environment variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secfb_db"

NODE_ENV="development"
PORT="3000"
ADDRESS="0.0.0.0"

CORS_ORIGIN_REGEXP="^http://localhost:\d+$"

COOKIE_SECRET="secret"
COOKIE_NAME="SECFB_REFRESH_TOKEN"
COOKIE_PATH="/"
COOKIE_DOMAIN="localhost"
COOKIE_LIFETIME="604800"

JWT_SECRET="secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="secret"
JWT_REFRESH_EXPIRES_IN="7d"

SALT_ROUNDS="10"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="hash"
```

**Important:** Generate secure secrets for production:

```bash
openssl rand -hex 32
```

**Important:** Generate admin password hash:

```bash
node -e "console.log(require('bcrypt').hashSync('password', 10))"
```

### 5. Database Setup

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### 6. Start the Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## API Documentation

Once the server is running, access the interactive API documentation at:

- **Swagger UI**: `http://localhost:3000/api`

## Available Scripts

```bash
# Development
npm run start:dev          # Start development server with hot reload
npm run start:debug        # Start with debugging enabled

# Production
npm run build              # Build the application
npm run start:prod         # Start production server

# Database
npm run db:migrate         # Run database migrations
npm run db:generate        # Generate Prisma client
npm run db:reset           # Reset database (destructive)
npm run db:studio          # Open Prisma Studio

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

## Project Structure

```
src/
├── common/                # Shared utilities and configurations
│   ├── decorators/        # Decorators
│   ├── dtos/              # Data Transfer Objects
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Response interceptors
│   ├── prisma/            # Database schema and migrations
│   └── utils/             # Utility functions
├── modules/               # Feature modules
│   ├── auth/              # Auth management
│   ├── games/             # Games management
│   ├── prisma/            # Database service
│   ├── seasons/           # Seasons management
│   ├── stadiums/          # Stadiums management
│   └── teams/             # Teams management
├── app.module.ts          # Root application module
├── config.ts              # Environment configuration
└── main.ts                # Application entry point
```

## Roadmap

- [x] Authentication module
- [ ] Complete teams module
- [ ] Complete games module

---

**Note**: This project is currently in active development. Some features may be incomplete or subject to change.
