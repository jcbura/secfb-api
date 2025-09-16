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

### Technical Features

- **Rate Limiting**: Built-in request throttling
- **API Documentation**: Auto-generated Swagger/OpenAPI docs
- **Data Validation**: Input validation with class-validator
- **Database Management**: Prisma ORM with PostgreSQL
- **Soft Deletes**: Safe data deletion with restore capabilities
- **CORS Support**: Cross-origin resource sharing
- **Structured Responses**: Consistent API response format

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
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
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/secfb_db"

# Server Configuration
PORT=3000
ADDRESS=0.0.0.0
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN_REGEXP="^http://localhost:\\d+$"
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
├── common/                 # Shared utilities and configurations
│   ├── dtos/              # Data Transfer Objects
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Response interceptors
│   ├── prisma/            # Database schema and migrations
│   └── utils/             # Utility functions
├── modules/               # Feature modules
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

- [ ] Authentication module (JWT-based auth)
- [ ] Complete teams module (additional team data, season stats)
- [ ] Complete games module (live scores, game details)

---

**Note**: This project is currently in active development. Some features may be incomplete or subject to change.
