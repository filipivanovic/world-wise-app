import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Product from './pages/Product.jsx'
import HomePage from './pages/HomePage.jsx'
import Pricing from './pages/Pricing.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App