# LM Residence - Room Availability Manager

A Next.js application for managing room availability using PostgreSQL, Prisma, and Docker.

## Features

- Display rooms in a list
- Toggle availability for each room
- Real-time updates via API routes
- Dockerized PostgreSQL database for easy testing

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   The `.env` file should contain:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lm_residence?schema=public"
   ```

3. **Start the PostgreSQL database with Docker:**
   ```bash
   docker-compose up -d
   ```

4. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

5. **Push the schema to the database:**
   ```bash
   npm run db:push
   ```

6. **Seed the database with sample rooms (optional):**
   ```bash
   npm run db:seed
   ```
   Or use Prisma Studio to add rooms manually:
   ```bash
   npm run db:studio
   ```

7. **Start the development server:**
   ```bash
   npm run dev
   ```

8. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

## API Routes

- `GET /api/rooms` - Fetch all rooms
- `PATCH /api/rooms/[id]/toggle` - Toggle room availability

## Database Management

To stop the database:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```
