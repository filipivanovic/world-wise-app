import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useState } from 'react'
import { useCities } from '../context/CitiesContext.jsx'

const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const navigate = useNavigate()
  const { cities } = useCities()

  const lat = searchParam.get('lat')
  const lng = searchParam.get('lng')

  return (
    <div
      onClick={() => {
        navigate('form')
      }}
      className={styles.mapContainer}
    >
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map