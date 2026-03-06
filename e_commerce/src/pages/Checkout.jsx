import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  HiOutlineShoppingBag,
  HiOutlineLockClosed,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi'
import { useCart, parsePrice } from '../context/CartContext'
import Navbar from '../components/Navbar'

const SHIPPING_FEE = 2500
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

function InputField({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-none border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
      />
    </div>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, subtotal, variantKey, clearCart } = useCart()

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) navigate('/', { replace: true })
  }, [cartItems, navigate])

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [summaryOpen, setSummaryOpen] = useState(false) // mobile accordion

  const [form, setForm] = useState({
    email: '', phone: '',
    firstName: '', lastName: '',
    address: '', city: '', state: '',
    cardNumber: '', expiry: '', cvv: '',
  })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const total = subtotal + SHIPPING_FEE
  const fmt = (n) => `₦${n.toLocaleString('en-NG')}`

  function handleSubmit(e) {
    e.preventDefault()
    clearCart()
    navigate('/success')
  }

  if (cartItems.length === 0) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs tracking-[0.08em] text-slate-500">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Checkout</span>
        </nav>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

            {/* ── LEFT: Forms ──────────────────────────────────── */}
            <div className="lg:col-span-7 space-y-10">

              {/* ── Shipping ── */}
              <section>
                <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-slate-300">
                  Contact & Shipping
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <InputField label="Email" id="email" type="email" placeholder="you@example.com"
                      value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField label="Phone" id="phone" type="tel" placeholder="+234 800 000 0000"
                      value={form.phone} onChange={handleChange} required />
                  </div>
                  <InputField label="First Name" id="firstName" placeholder="Adaeze"
                    value={form.firstName} onChange={handleChange} required />
                  <InputField label="Last Name" id="lastName" placeholder="Okafor"
                    value={form.lastName} onChange={handleChange} required />
                  <div className="sm:col-span-2">
                    <InputField label="Address" id="address" placeholder="12 Broad Street"
                      value={form.address} onChange={handleChange} required />
                  </div>
                  <InputField label="City" id="city" placeholder="Lagos"
                    value={form.city} onChange={handleChange} required />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="state" className="text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="rounded-none border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="border-t border-slate-800" />

              {/* ── Payment ── */}
              <section>
                <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-slate-300">
                  Payment
                </h2>

                {/* Toggle tabs */}
                <div className="mb-6 flex border border-slate-700">
                  {['card', 'transfer'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                        paymentMethod === method
                          ? 'bg-white text-slate-950'
                          : 'bg-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {method === 'card' ? 'Credit / Debit Card' : 'Bank Transfer'}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    {/* Card logos */}
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold tracking-widest text-blue-400">VISA</span>
                      <span className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold tracking-widest text-red-400">MC</span>
                      <span className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold tracking-widest text-green-400">VERVE</span>
                    </div>
                    <InputField label="Card Number" id="cardNumber"
                      placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} required />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Expiry Date" id="expiry"
                        placeholder="MM / YY" value={form.expiry} onChange={handleChange} required />
                      <InputField label="CVV" id="cvv"
                        placeholder="123" value={form.cvv} onChange={handleChange} required />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border border-slate-700 bg-slate-900/60 p-5">
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Bank Details
                      </p>
                      <dl className="space-y-2.5 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-slate-500">Bank Name</dt>
                          <dd className="font-medium text-slate-200">Zenith Bank PLC</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-500">Account Name</dt>
                          <dd className="font-medium text-slate-200">YourBrand Ltd</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-500">Account Number</dt>
                          <dd className="font-mono font-bold tracking-widest text-white">2034 5678 90</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-500">Amount to Send</dt>
                          <dd className="font-bold text-white">{fmt(total)}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex items-start gap-3 border border-amber-500/30 bg-amber-500/5 p-4">
                      <HiOutlineLockClosed className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <p className="text-xs leading-relaxed text-amber-300">
                        Your order will be processed once we confirm the transfer. This usually takes 1–2 business hours. Use your order number as the payment reference.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Submit button (desktop: visible here; mobile: sticky at bottom) */}
              <button
                type="submit"
                className="hidden w-full bg-white py-4 text-sm font-bold tracking-tight text-slate-950 transition-colors hover:bg-slate-200 lg:block"
              >
                Complete Order — {fmt(total)}
              </button>
            </div>

            {/* ── RIGHT: Order Summary ──────────────────────────── */}
            <div className="lg:col-span-5">
              {/* Mobile accordion toggle */}
              <button
                type="button"
                onClick={() => setSummaryOpen((o) => !o)}
                className="flex w-full items-center justify-between border border-slate-700 bg-slate-900/60 px-5 py-4 lg:hidden"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <HiOutlineShoppingBag className="h-5 w-5" />
                  <span>{summaryOpen ? 'Hide' : 'Show'} order summary</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white">{fmt(total)}</span>
                  {summaryOpen
                    ? <HiOutlineChevronUp className="h-4 w-4 text-slate-400" />
                    : <HiOutlineChevronDown className="h-4 w-4 text-slate-400" />
                  }
                </div>
              </button>

              {/* Summary panel */}
              <div className={`${summaryOpen ? 'block' : 'hidden'} lg:sticky lg:top-8 lg:block`}>
                <div className="border border-slate-800 bg-slate-900/50 p-6">
                  <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-300">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <ul className="mb-6 divide-y divide-slate-800">
                    {cartItems.map((item) => {
                      const key = variantKey(item)
                      const unitPrice = parsePrice(item.price)
                      const lineTotal = unitPrice * item.quantity
                      return (
                        <li key={key} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                          {/* Thumbnail with quantity badge */}
                          <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-slate-800">
                            {item.image
                              ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                              : <div className="flex h-full w-full items-center justify-center">
                                  <HiOutlineShoppingBag className="h-5 w-5 text-slate-600" />
                                </div>
                            }
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-[10px] font-bold text-white">
                              {item.quantity}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="flex flex-1 justify-between gap-2">
                            <div className="text-xs">
                              <p className="font-medium text-slate-100">{item.name}</p>
                              {item.selectedColor && item.selectedColor !== 'none' && (
                                <p className="text-slate-500">Color: {item.selectedColor}</p>
                              )}
                              {item.selectedSize && item.selectedSize !== 'none' && (
                                <p className="text-slate-500">Size: {item.selectedSize}</p>
                              )}
                            </div>
                            <p className="shrink-0 text-sm font-semibold text-slate-200">
                              {fmt(lineTotal)}
                            </p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  {/* Totals */}
                  <div className="space-y-2 border-t border-slate-800 pt-4 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Shipping</span>
                      <span>{fmt(SHIPPING_FEE)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3 text-base font-bold text-white">
                      <span>Total</span>
                      <span>{fmt(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile sticky submit */}
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-4 backdrop-blur-sm lg:hidden">
            <button
              type="submit"
              className="w-full bg-white py-4 text-sm font-bold tracking-tight text-slate-950 transition-colors hover:bg-slate-200"
            >
              Complete Order — {fmt(total)}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
