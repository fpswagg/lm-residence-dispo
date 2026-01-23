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
        No rooms found. Please check the external API connection.
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            border: `3px solid ${room.disponibilite ? '#4caf50' : '#f44336'}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image Section */}
          {room.firstImage && (
            <div
              style={{
                width: '100%',
                height: '250px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                position: 'relative',
              }}
            >
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
            </div>
          )}

          {/* Content Section */}
          <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    margin: 0,
                    color: '#333',
                  }}
                >
                  {room.nom}
                </h2>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: room.type === 'studio' ? '#e3f2fd' : '#f3e5f5',
                    color: room.type === 'studio' ? '#1976d2' : '#7b1fa2',
                    textTransform: 'capitalize',
                  }}
                >
                  {room.type}
                </span>
              </div>
              
              <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {room.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.875rem', color: '#666' }}>
                  📏 {room.surface}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#666' }}>
                  👥 {room.capacite} {room.capacite === 1 ? 'personne' : 'personnes'}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: '600' }}>
                  💰 {room.prix.toLocaleString()} {room.devise}
                </span>
              </div>

              <span
                style={{
                  display: 'inline-block',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  backgroundColor: room.disponibilite ? '#e8f5e9' : '#ffebee',
                  color: room.disponibilite ? '#2e7d32' : '#c62828',
                }}
              >
                {room.disponibilite ? '✓ Disponible' : '✗ Indisponible'}
              </span>
            </div>

            {/* Toggle Section */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.875rem', color: '#666', fontWeight: '500' }}>
                Modifier la disponibilité:
              </span>
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
                    checked={room.disponibilite}
                    onChange={() => onToggle(room.id, room.disponibilite)}
                    style={{
                      width: '56px',
                      height: '28px',
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundColor: room.disponibilite ? '#4caf50' : '#ccc',
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
                      left: room.disponibilite ? '30px' : '2px',
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
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
