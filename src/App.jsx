import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import CategoriesPage from './components/Categories/CategoryPage'
import CategoryProductsPage from './components/Categories/CategoryProductsPage'
import Products from './components/Products/ProductPage'
import Cart from './components/Cart/Cart'
import SalePage from './components/Sales/SalePage'
import ProductInform from './components/Products/ProductInform'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryProductsPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductInform />} />
        <Route path="/sales" element={<SalePage />} />{' '}
        <Route path="/basket" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
