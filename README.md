# LM Residence - Room Availability Manager

A Next.js application for managing room availability using PostgreSQL, Prisma, and Docker. Rooms are fetched from an external API, and only the ID and availability status are stored locally in the database.

## Features

- Fetch rooms from external API
- Display rooms with images in a beautiful grid layout
- Toggle availability for each room (stored in local database)
- Real-time updates via API routes
- Dockerized PostgreSQL database for easy testing
- Automatic synchronization of external room data

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Access to the external API that provides room data

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lm_residence?schema=public"
   EXTERNAL_API_URL="https://your-api-url.com/api/logements"
   ```
   
   **Important:** Replace `EXTERNAL_API_URL` with your actual external API endpoint that returns room data in the format:
   ```json
   [
     {
       "id": 1,
       "nom": "Room Name",
       "type": "studio",
       "description": "Description",
       "capacite": 2,
       "surface": "45m²",
       "prix": 40000,
       "devise": "FCFA",
       "disponibilite": true,
       "equipements": ["..."],
       "images": ["/images/image.jpg"]
     }
   ]
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

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   The application will automatically fetch rooms from the external API and sync them with the database on first load.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

## API Routes

- `GET /api/rooms` - Fetch all rooms from external API and merge with local availability status
- `PATCH /api/rooms/[id]/toggle` - Toggle room availability (updates local database only)

## How It Works

1. **Data Flow:**
   - Rooms are fetched from the external API specified in `EXTERNAL_API_URL`
   - Only the `id` (externalId) and `disponibilite` (availability) are stored in the local PostgreSQL database
   - All other room data (name, description, images, etc.) comes from the external API
   - Images are automatically prefixed with the API origin URL

2. **Availability Management:**
   - When you toggle availability, it updates the local database
   - The local availability status takes precedence over the external API's availability
   - If a room doesn't exist in the local database, it uses the external API's availability status

3. **Image Handling:**
   - The first image from the `images` array is displayed
   - Image paths are automatically prefixed with the external API's origin URL
   - Example: If API is `https://api.example.com` and image is `/images/room.jpg`, it becomes `https://api.example.com/images/room.jpg`

## Database Management

To stop the database:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```
