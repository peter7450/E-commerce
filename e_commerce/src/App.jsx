import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'
import NewArrivals from './components/NewArrivals'

function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-white">
      <Navbar />
      <Hero />
      <NewArrivals />
    </div>
  )
}

export default App
