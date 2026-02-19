import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-white">
      <Navbar />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="mt-10 text-3xl font-semibold tracking-tight">
          Welcome to your e-commerce MVP
        </h1>
        <p className="mt-3 max-w-xl text-sm text-[#000000]">
          This is your starting point for a premium storefront experience. Add
          hero sections, product grids, and more beneath this navbar.
        </p>
      </main>
    </div>
  )
}

export default App
