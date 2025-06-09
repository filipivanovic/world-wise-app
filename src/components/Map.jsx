import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useState } from 'react'
import { useCities } from '../context/CitiesContext.jsx'

const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const navigate = useNavigate()
  const { cities } = useCities()

  const mapLat = searchParam.get('lat')
  const mapLng = searchParam.get('lng')

  return (
    <div
      onClick={() => {
        navigate('form')
      }}
      className={styles.mapContainer}
    >
      <MapContainer
        center={mapPosition}
        zoom={7}
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
        {mapLat && mapLng && <ChangeCenter position={[mapLat, mapLng]} />}
      </MapContainer>
    </div>
  )
}

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}

export default Map