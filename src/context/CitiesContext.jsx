import { createContext, useContext, useEffect, useReducer, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
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
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city !== action.payload),
        currentCity: {}
      }
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
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState)

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
    if (Number(id) === currentCity.id) return
    try {
      dispatch({ type: 'loading' })
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await response.json()
      dispatch({ type: 'city/loaded', payload: data })
    } catch (error) {
      console.error(`Error in fetchCities method: ${error.message || error}`)
      dispatch({ type: 'rejected', payload: error.message || error })
    }
  }

  const createCity = async newCity => {
    try {
      dispatch({ type: 'loading' })
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCity)
      })
      const data = await response.json()
      dispatch({ type: 'city/created', payload: data })
    } catch (error) {
      console.error(`Error in createCity method: ${error.message || error}`)
      dispatch({ type: 'rejected', payload: error.message || error })
    }
  }

  const deleteCity = async id => {
    try {
      dispatch({ type: 'loading' })
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      console.error(`Error in deleteCity method: ${error.message || error}`)
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}
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