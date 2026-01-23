-- Supabase SQL Schema for LM Residence
-- Based on Prisma schema

-- Create the Room table
CREATE TABLE IF NOT EXISTS "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" INTEGER NOT NULL UNIQUE,
    "disponibilite" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on externalId for faster lookups
CREATE INDEX IF NOT EXISTS "Room_externalId_idx" ON "Room"("externalId");

-- Create function to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updatedAt on row updates
DROP TRIGGER IF EXISTS update_room_updated_at ON "Room";
CREATE TRIGGER update_room_updated_at
    BEFORE UPDATE ON "Room"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE "Room" IS 'Stores room availability status synced from external API';
COMMENT ON COLUMN "Room"."id" IS 'Primary key (CUID)';
COMMENT ON COLUMN "Room"."externalId" IS 'ID from external API (unique)';
COMMENT ON COLUMN "Room"."disponibilite" IS 'Room availability status';
COMMENT ON COLUMN "Room"."createdAt" IS 'Record creation timestamp';
COMMENT ON COLUMN "Room"."updatedAt" IS 'Record last update timestamp (auto-updated)';
