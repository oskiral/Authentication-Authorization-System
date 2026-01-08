# Authorization System

Centralized authentication and authorization backend.

## Key Features

- **Authentication**: Secure login/register flow using JWT (JSON Web Tokens).
- **Refresh Token Rotation**: Enhanced security with single-use refresh tokens to prevent replay attacks.
- **Session Management**: Full control over user sessions, including secure logout and token invalidation in the database.
- **Bitmask Authorization**: High-performance permission system using bitwise operations.
- **Modular Architecture**: Clean separation between Auth and User modules (Controllers, Services, Routers).
- **TypeScript**: Full type safety for requests and user payloads.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma (PostgreSQL)
- **Security**: JWT, Bcrypt
- **Language**: TypeScript

## Database & Schema

The project uses **Prisma** as an ORM. The user model includes a `permissions` field stored as an integer to support bitwise authorization.

To get started with the database:
1. Run `npx prisma generate` to create the client.
2. Run `npx prisma db push` to sync the schema.

# TODO

### Security
- [ ] **Request Validation (Zod)**
- [ ] **Password Strength Validation**
- [ ] **Rate Limiting**
- [ ] **Account Locking**
- [ ] **Reuse Detection**

### Reliability
- [ ] **Global Error Handler**
- [ ] **Professional Logger**
- [ ] **Database health Endpoint**

### Documentation
- [ ] **Swagger**