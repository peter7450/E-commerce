import { Link } from 'react-router-dom'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import Navbar from '../components/Navbar'

export default function OrderSuccess() {
  // Generate a fake order number once per render
  // eslint-disable-next-line react-hooks/purity
  const orderNumber = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto flex max-w-lg flex-col items-center px-6 pb-20 pt-36 text-center">
        <HiOutlineCheckCircle className="mb-6 h-16 w-16 text-green-400" />

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Order Confirmed
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Thank you for your order. We&apos;re preparing it and will send you a
          confirmation email shortly.
        </p>

        <div className="mt-8 w-full border border-slate-800 bg-slate-900/50 p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Order Number
          </p>
          <p className="mt-1 font-mono text-xl font-bold tracking-widest text-white">
            {orderNumber}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Estimated delivery: <span className="text-slate-300">3–5 business days</span>
          </p>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex-1 border border-slate-700 py-4 text-sm font-bold tracking-tight text-slate-300 transition-colors hover:border-slate-500 hover:text-white text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/wishlist"
            className="flex-1 bg-white py-4 text-sm font-bold tracking-tight text-slate-950 transition-colors hover:bg-slate-200 text-center"
          >
            View Wishlist
          </Link>
        </div>
      </div>
    </div>
  )
}
