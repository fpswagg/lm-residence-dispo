import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample rooms
  const rooms = [
    {
      name: 'Room 101',
      description: 'Single bedroom with ensuite bathroom',
      available: true,
    },
    {
      name: 'Room 102',
      description: 'Double bedroom with shared bathroom',
      available: true,
    },
    {
      name: 'Room 201',
      description: 'Studio apartment with kitchenette',
      available: false,
    },
    {
      name: 'Room 202',
      description: 'One-bedroom apartment',
      available: true,
    },
    {
      name: 'Room 301',
      description: 'Two-bedroom apartment',
      available: false,
    },
  ]

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { name: room.name },
      update: {},
      create: room,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
