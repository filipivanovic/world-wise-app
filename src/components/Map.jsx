import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext.jsx'
import { useGeolocation } from '../hooks/useGeolocation.js'
import Button from './Button.jsx'

const Map = () => {
  const [searchParam] = useSearchParams()
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const navigate = useNavigate()
  const { cities } = useCities()

  const mapLat = searchParam.get('lat')
  const mapLng = searchParam.get('lng')

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }
  }, [mapLat, mapLng])

  return (
    <div className={styles.mapContainer}>
      <Button type={`position`} onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your location'}
      </Button>
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
        <DetectClick />
      </MapContainer>
    </div>
  )
}

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}

const DetectClick = () => {
  const navigate = useNavigate()

  useMapEvents({
    click: e => {
      const lat = e.latlng.lat
      const lng = e.latlng.lng
      navigate(`form?lat=${lat}&lng=${lng}`)
    }
  })

  return null
}

export default Map