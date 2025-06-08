import { createContext, useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
      } catch (error) {
        console.error(`Error in fetchCities method: ${error.message || error}`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  return <CitiesContext.Provider value={{ cities, isLoading }}>{children}</CitiesContext.Provider>
}

export { CitiesContext, CitiesProvider }