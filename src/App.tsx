import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CartProvider } from './context/CartContext'
import { About } from './pages/About'
import { Cart } from './pages/Cart'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { ProductListing } from './pages/ProductListing'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ProductListing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}
