'use client'

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

interface RoomListProps {
  rooms: Room[]
  onToggle: (id: number, currentAvailability: boolean) => void
}

export default function RoomList({ rooms, onToggle }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        Aucun logement trouvé.
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        width: '100%',
      }}
    >
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {/* Image */}
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
              backgroundColor: '#e0e0e0',
              position: 'relative',
            }}
          >
            {room.firstImage ? (
              <img
                src={room.firstImage}
                alt={room.nom}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '0.875rem',
                }}
              >
                Pas d'image
              </div>
            )}
            {/* Availability Badge Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: room.disponibilite ? '#4caf50' : '#f44336',
                color: '#fff',
              }}
            >
              {room.disponibilite ? 'Disponible' : 'Indisponible'}
            </div>
          </div>

          {/* Name and Toggle */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h2
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                margin: 0,
                color: '#333',
                lineHeight: '1.4',
              }}
            >
              {room.nom}
            </h2>

            {/* Toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#666',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '24px',
                  flexShrink: 0,
                }}
              >
                <input
                  type="checkbox"
                  checked={room.disponibilite}
                  onChange={() => onToggle(room.id, room.disponibilite)}
                  style={{
                    width: '44px',
                    height: '24px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundColor: room.disponibilite ? '#4caf50' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                    outline: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: room.disponibilite ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    transition: 'left 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <span>{room.disponibilite ? 'Disponible' : 'Indisponible'}</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}
