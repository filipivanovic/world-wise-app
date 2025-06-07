import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams()
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
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParam({ lat: 23, lng: 50 })}>Change position</button>
    </div>
  )
}

export default Map