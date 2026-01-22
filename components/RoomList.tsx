'use client'

interface Room {
  id: string
  name: string
  description: string | null
  available: boolean
  createdAt: string
  updatedAt: string
}

interface RoomListProps {
  rooms: Room[]
  onToggle: (id: string, currentAvailability: boolean) => void
}

export default function RoomList({ rooms, onToggle }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        No rooms found. Add some rooms to the database to get started.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            padding: '1.5rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `2px solid ${room.available ? '#4caf50' : '#f44336'}`,
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
              }}
            >
              {room.name}
            </h2>
            {room.description && (
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                {room.description}
              </p>
            )}
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '500',
                backgroundColor: room.available ? '#e8f5e9' : '#ffebee',
                color: room.available ? '#2e7d32' : '#c62828',
              }}
            >
              {room.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '56px',
                height: '28px',
              }}
            >
              <input
                type="checkbox"
                checked={room.available}
                onChange={() => onToggle(room.id, room.available)}
                style={{
                  width: '56px',
                  height: '28px',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundColor: room.available ? '#4caf50' : '#ccc',
                  borderRadius: '14px',
                  position: 'relative',
                  transition: 'background-color 0.3s',
                  outline: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: room.available ? '30px' : '2px',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: 'left 0.3s',
                  pointerEvents: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </div>
            <span style={{ fontSize: '0.875rem', color: '#666', minWidth: '120px' }}>
              {room.available ? 'Available' : 'Unavailable'}
            </span>
          </label>
        </div>
      ))}
    </div>
  )
}
