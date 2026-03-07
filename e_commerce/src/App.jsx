import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewArrivals from './components/NewArrivals'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/Login'
import CartDrawer from './components/CartDrawer'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <NewArrivals />
      </main>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/success" element={<OrderSuccess />} />
        </Routes>
        <CartDrawer />
      </BrowserRouter>
    </div>
  )
}

export default App
