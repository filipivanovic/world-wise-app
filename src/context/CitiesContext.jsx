import { createContext, useContext, useEffect, useReducer, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
  // getCity: () => {},
  // createCity: () => {},
  // deleteCity: () => {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      }
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'cities/created':
    case 'cities/deleted':
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' })
      try {
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        console.error(`Error in fetchCities method: ${error.message || error}`)
        dispatch({ type: 'rejected', payload: error.message || error })
      }
    }
    fetchCities()
  }, [])

  const getCity = async id => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      setCurrentCity(data)
    } catch (error) {
      console.error(`Error in fetchCities method: ${error.message || error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const createCity = async newCity => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCity)
      })
      const data = await response.json()
      setCities(city => [...city, data])
    } catch (error) {
      console.error(`Error in createCity method: ${error.message || error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCity = async id => {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      setCities(cities => cities.filter(city => city !== id))
    } catch (error) {
      console.error(`Error in deleteCity method: ${error.message || error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

const useCities = () => {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider')
  }
  return context
}

export { CitiesProvider, useCities }