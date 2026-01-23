import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface ExternalRoom {
  id: number
  nom: string
  type: string
  description: string
  capacite: number
  surface: string
  prix: number
  devise: string
  disponibilite: boolean
  equipements: string[]
  images: string[]
}

export async function GET() {
  try {
    // Fetch rooms from external API
    const externalApiUrl = process.env.EXTERNAL_API_URL || ''
    
    if (!externalApiUrl) {
      return NextResponse.json(
        { error: 'EXTERNAL_API_URL environment variable is not set' },
        { status: 500 }
      )
    }

    const externalResponse = await fetch(externalApiUrl);

    if (!externalResponse.ok) {
      throw new Error(`External API returned ${externalResponse.status}`)
    }

    const externalRooms: ExternalRoom[] = await externalResponse.json()

    // Get availability status from database
    const dbRooms = await prisma.room.findMany()
    const availabilityMap = new Map<number, boolean>()
    for (const room of dbRooms) {
      availabilityMap.set(room.externalId, room.disponibilite)
    }

    // Merge external data with database availability status
    const mergedRooms = externalRooms.map((room) => {
      const dbAvailability = availabilityMap.get(room.id)
      const disponibilite = dbAvailability !== undefined ? dbAvailability : room.disponibilite

      // Get API origin for image URLs
      const apiOrigin = new URL(externalApiUrl).origin
      let firstImage: string | null = null
      if (room.images && room.images.length > 0) {
        const imagePath = room.images[0]
        // Check if image is already a full URL
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
          firstImage = imagePath
        } else {
          // Prepend API origin for relative paths
          firstImage = `${apiOrigin}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
        }
      }

      return {
        id: room.id,
        nom: room.nom,
        type: room.type,
        description: room.description,
        capacite: room.capacite,
        surface: room.surface,
        prix: room.prix,
        devise: room.devise,
        disponibilite,
        equipements: room.equipements,
        images: room.images,
        firstImage,
        apiOrigin,
      }
    })

    // Sync external rooms to database (only create if doesn't exist, preserve existing availability)
    for (const room of externalRooms) {
      await prisma.room.upsert({
        where: { externalId: room.id },
        update: {
          // Don't update existing rooms - preserve user's availability changes
        },
        create: {
          externalId: room.id,
          disponibilite: room.disponibilite,
        },
      })
    }

    return NextResponse.json(mergedRooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rooms', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
