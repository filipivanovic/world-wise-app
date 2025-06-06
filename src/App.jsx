import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Product from './pages/Product.jsx'
import HomePage from './pages/HomePage.jsx'
import Pricing from './pages/Pricing.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import AppLayout from './pages/AppLayout.jsx'
import Login from './pages/Login.jsx'
import CityList from './components/CityList.jsx'
import CountryList from './components/CountryList.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>LIST</p>} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<p>form</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App