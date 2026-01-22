'use client'

import { useEffect, useState } from 'react'
import RoomList from '@/components/RoomList'

interface Room {
  id: string
  name: string
  description: string | null
  available: boolean
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/rooms')
      if (!response.ok) {
        throw new Error('Failed to fetch rooms')
      }
      const data = await response.json()
      setRooms(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleToggle = async (id: string, currentAvailability: boolean) => {
    try {
      const response = await fetch(`/api/rooms/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: !currentAvailability }),
      })

      if (!response.ok) {
        throw new Error('Failed to toggle availability')
      }

      // Update local state
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === id ? { ...room, available: !currentAvailability } : room
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle availability')
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
        LM Residence - Room Availability
      </h1>
      
      {error && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '4px',
            border: '1px solid #fcc',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading rooms...</div>
      ) : (
        <RoomList rooms={rooms} onToggle={handleToggle} />
      )}
    </main>
  )
}
