import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const externalId = parseInt(params.id)
    if (isNaN(externalId)) {
      return NextResponse.json(
        { error: 'Invalid room ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { disponibilite } = body

    // Upsert the room with new availability status
    const room = await prisma.room.upsert({
      where: { externalId },
      update: { disponibilite },
      create: {
        externalId,
        disponibilite,
      },
    })

    return NextResponse.json({ success: true, room })
  } catch (error) {
    console.error('Error toggling room availability:', error)
    return NextResponse.json(
      { error: 'Failed to toggle room availability' },
      { status: 500 }
    )
  }
}
