import styles from './CountryList.module.css'
import Spinner from './Spinner.jsx'
import CountryItem from './CountryItem.jsx'
import Message from './Message.jsx'
import { useCities } from '../context/CitiesContext.jsx'

const CountryList = () => {
  const { cities, isLoading } = useCities()

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(el => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else {
      return arr
    }
  }, [])

  if (isLoading) return <Spinner />
  if (!countries.length) return <Message message="No cities found" />

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList