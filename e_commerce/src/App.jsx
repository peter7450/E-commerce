import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewArrivals from './components/NewArrivals'
import ProductDetails from './pages/ProductDetails'
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
