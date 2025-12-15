# Scordy

A Discord-inspired real-time chat application built from scratch with robust authentication, server management, and messaging capabilities.

## Features

- **Secure Authentication & Authorization**: Custom-built JWT-based authentication system for secure user access
- **Server & Channel Management**: Create and manage servers with public, private, and direct message channels
- **Real-Time Messaging**: WebSocket-powered chat functionality supporting:
  - Server-wide communication
  - Private channels
  - Direct messages (DMs)
- **User Management**: Comprehensive user profiles with friend system
- **Role-Based Access**: Moderator and member roles for server management

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt password hashing
- **Real-Time**: WebSockets

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux

### Infrastructure
- **Containerization**: Docker Compose for PostgreSQL

## Project Structure

```
Scordy/
├── Backend/
│   ├── src/
│   │   ├── app.ts              # Express server setup
│   │   ├── controllers/        # Route handlers
│   │   │   ├── auth.ts         # Authentication endpoints
│   │   │   └── users.ts        # User management endpoints
│   │   ├── services/           # Business logic
│   │   │   ├── authService.ts  # Auth & JWT handling
│   │   │   └── userService.ts  # User operations
│   │   ├── dtos.ts             # Data transfer objects
│   │   └── customExceptions.ts # Error handling
│   ├── schema.prisma           # Database schema
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── contexts/           # React contexts
│   │   ├── App.tsx             # Main application
│   │   └── main.tsx            # Entry point
│   └── package.json
├── docker-compose.yml          # PostgreSQL container config
└── package.json                # Root package config
```

## Database Schema

The application uses the following data models:

- **User**: User accounts with authentication credentials
- **Server**: Chat servers with channels and members
- **Channel**: Communication channels (PUBLIC, PRIVATE, DM)
- **Message**: Chat messages with timestamps
- **Friends**: User friendship relationships

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Scordy
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd Backend
   npm install

   # Install frontend dependencies
   cd ../Frontend
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `Backend` directory:
   ```env
   POSTGRES_DB=exampledb
   POSTGRES_USER=exampleuser
   POSTGRES_PASSWORD=examplepass
   DATABASE_URL="postgresql://exampleuser:examplepass@localhost:5432/exampledb?schema=public"
   JWT_SECRET=your-secret-key-here
   ```

4. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

5. **Run Prisma migrations**
   ```bash
   cd Backend
   npx prisma migrate dev
   npx prisma generate
   ```

### Running the Application

1. **Start the backend server** (from `Backend` directory):
   ```bash
   npm start
   ```
   Backend runs on `http://localhost:3000`

2. **Start the frontend development server** (from `Frontend` directory):
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173` (default Vite port)

3. **Build Tailwind CSS** (optional, in separate terminal from `Frontend` directory):
   ```bash
   npm run tailwind
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### Users (Protected)
- Requires `Authorization: Bearer <token>` header
- User management endpoints available at `/users/*`

## Development

### Backend
```bash
cd Backend
npm start  # Runs with nodemon for hot reload
```

### Frontend
```bash
cd Frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Database Management
```bash
cd Backend
npx prisma studio        # Open Prisma Studio GUI
npx prisma migrate dev   # Create and apply migrations
npx prisma generate      # Generate Prisma Client
```

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based stateless authentication
- Protected API routes with middleware authorization
- Input validation for all user data

## Future Enhancements

- WebSocket implementation for real-time messaging
- File upload for avatars and attachments
- Voice channels
- Message reactions and threading
- Server roles and permissions
- Search functionality

## License

ISC

## Author

Built as a full-stack Discord clone project demonstrating modern web development practices.
