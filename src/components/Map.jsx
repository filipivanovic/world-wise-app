import styles from './Map.module.css'
import { useSearchParams } from 'react-router-dom'

const Map = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const lat = searchParam.get('lat')
  const lng = searchParam.get('lng')

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParam({ lat: 23, lng: 50 })}>Change position</button>
    </div>
  )
}

export default Map