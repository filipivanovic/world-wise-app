import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Product from './pages/Product.jsx'
import HomePage from './pages/HomePage.jsx'
import Pricing from './pages/Pricing.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import AppLayout from './pages/AppLayout.jsx'
import Login from './pages/Login.jsx'
import CityList from './components/CityList.jsx'
import CountryList from './components/CountryList.jsx'
import City from './components/City.jsx'
import Form from './components/Form.jsx'

const BASE_URL = 'http://localhost:8000'

const App = () => {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" replace />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App