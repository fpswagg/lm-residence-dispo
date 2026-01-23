'use client'

import { useEffect, useState } from 'react'
import RoomList from '@/components/RoomList'

interface Room {
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
  firstImage: string | null
  apiOrigin: string
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
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch rooms')
      }
      const data = await response.json()
      setRooms(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleToggle = async (id: number, currentAvailability: boolean) => {
    try {
      const response = await fetch(`/api/rooms/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ disponibilite: !currentAvailability }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to toggle availability')
      }

      // Update local state
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === id ? { ...room, disponibilite: !currentAvailability } : room
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle availability')
      console.error('Error toggling availability:', err)
    }
  }

  return (
    <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.25rem', color: '#333' }}>
          LM Residence
        </h1>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>
          Gestion des disponibilités
        </p>
      </div>
      
      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '4px',
            fontSize: '0.875rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{error}</span>
          <button
            onClick={fetchRooms}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: '#c33',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
          >
            Réessayer
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <div style={{ fontSize: '1rem' }}>Chargement...</div>
        </div>
      ) : (
        <>
          {rooms.length > 0 && (
            <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>
              {rooms.length} {rooms.length === 1 ? 'logement' : 'logements'}
            </div>
          )}
          <RoomList rooms={rooms} onToggle={handleToggle} />
        </>
      )}
    </main>
  )
}
