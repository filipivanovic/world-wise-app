import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useState } from 'react'

const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const navigate = useNavigate()

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
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map