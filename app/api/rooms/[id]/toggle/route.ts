import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { available } = body

    const room = await prisma.room.update({
      where: { id },
      data: { available },
    })

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error toggling room availability:', error)
    return NextResponse.json(
      { error: 'Failed to toggle room availability' },
      { status: 500 }
    )
  }
}
