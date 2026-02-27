import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineGlobe,
} from 'react-icons/hi'
import { useCart } from '../context/CartContext.jsx'

const navLinks = [
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'New Arrivals', href: '/new' },
  { label: 'Sale', href: '/sale' },
]

const SEARCH_PRODUCTS = [
  { id: '1', name: 'Essential Hoodie', category: 'Men', price: '₦28,500', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80&q=70' },
  { id: '2', name: 'Relaxed Fit Chinos', category: 'Men', price: '₦18,900', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&q=70' },
  { id: '3', name: 'Classic Denim Jacket', category: 'Men', price: '₦32,000', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&q=70' },
  { id: '4', name: 'Wool Blend Blazer', category: 'Men', price: '₦45,000', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=80&q=70' },
  { id: '5', name: 'Linen Shirt', category: 'Men', price: '₦15,200', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&q=70' },
  { id: '6', name: 'Floral Midi Dress', category: 'Women', price: '₦22,000', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=80&q=70' },
  { id: '7', name: 'Cropped Blazer', category: 'Women', price: '₦38,000', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=80&q=70' },
  { id: '8', name: 'Wide Leg Trousers', category: 'Women', price: '₦20,500', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=80&q=70' },
  { id: '9', name: 'Leather Belt', category: 'Accessories', price: '₦8,500', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&q=70' },
  { id: '10', name: 'Canvas Tote Bag', category: 'Accessories', price: '₦6,200', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=80&q=70' },
]

const MAX_SHOWN = 4

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalQuantity } = useCart()
  const navigate = useNavigate()
  const searchContainerRef = useRef(null)
  const inputRef = useRef(null)

  const filtered = searchQuery.trim().length > 0
    ? SEARCH_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const shown = filtered.slice(0, MAX_SHOWN)
  const hasMore = filtered.length > MAX_SHOWN

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function openSearch() {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function closeSearch() {
    setSearchOpen(false)
    setSearchQuery('')
  }

  function handleSelectProduct(product) {
    closeSearch()
    navigate(`/product/${product.id}`)
  }

  const showDropdown = searchOpen && searchQuery.trim().length > 0

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-4 sm:px-6">
          <div className="flex h-12 flex-1 items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-4 text-slate-100 shadow-lg backdrop-blur-lg sm:px-6">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-900">
                  LOGO
                </div>
                <span className="hidden text-sm font-medium tracking-tight sm:inline">
                  YourBrand
                </span>
              </Link>
            </div>

            {/* Center: Desktop links (hidden when search is open) */}
            {!searchOpen && (
              <div className="hidden items-center gap-6 text-xs font-medium tracking-[0.08em] md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group relative pb-0.5 text-slate-200 transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <span className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[2px] origin-center scale-x-0 rounded-full bg-white/80 transition-transform duration-200 group-hover:scale-x-100" />
                  </a>
                ))}
              </div>
            )}

            {/* Expanded search input (desktop) */}
            {searchOpen && (
              <div className="hidden flex-1 px-4 md:block" ref={searchContainerRef}>
                <div className="relative">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    <HiOutlineSearch className="h-4 w-4 shrink-0 text-slate-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, categories…"
                      className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none"
                      onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-slate-300">
                        <HiOutlineX className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Desktop dropdown */}
                  {showDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
                      {shown.length > 0 ? (
                        <>
                          <ul>
                            {shown.map((product) => (
                              <li key={product.id}>
                                <button
                                  type="button"
                                  onClick={() => handleSelectProduct(product)}
                                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-100">{product.name}</p>
                                    <p className="text-xs text-slate-500">{product.category}</p>
                                  </div>
                                  <span className="shrink-0 text-sm font-medium text-slate-300">{product.price}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                          {hasMore && (
                            <div className="border-t border-white/5 px-4 py-3">
                              <button
                                type="button"
                                onClick={() => { closeSearch(); navigate('/products') }}
                                className="text-xs font-medium tracking-[0.08em] text-slate-400 hover:text-white"
                              >
                                View all {filtered.length} results for &ldquo;{searchQuery}&rdquo; →
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-8 text-center">
                          <HiOutlineSearch className="h-8 w-8 text-slate-600" />
                          <p className="text-sm font-medium text-slate-300">No products found for &ldquo;{searchQuery}&rdquo;</p>
                          <p className="max-w-xs text-xs text-slate-500">Try checking your spelling or browsing our categories.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right: Region + Icons */}
            <div className="relative flex items-center gap-2">
              {/* Region selector (hidden when search is open on desktop) */}
              {!searchOpen && (
                <div className="hidden md:block">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium tracking-[0.08em] text-slate-200 hover:bg-white/10"
                    onClick={() => setRegionOpen((open) => !open)}
                    aria-haspopup="true"
                    aria-expanded={regionOpen}
                  >
                    <HiOutlineGlobe className="h-4 w-4" />
                    <span>EN / NGN</span>
                  </button>

                  {regionOpen && (
                    <div className="absolute right-20 top-12 w-56 rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-xs text-slate-100 shadow-xl backdrop-blur-lg">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                        Region &amp; Currency
                      </p>
                      <ul className="space-y-1.5">
                        <li>
                          <button className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left hover:bg-white/10">
                            <span>Nigeria</span>
                            <span className="text-slate-300">NGN</span>
                          </button>
                        </li>
                        <li>
                          <button className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left hover:bg-white/10">
                            <span>United States</span>
                            <span className="text-slate-300">USD</span>
                          </button>
                        </li>
                        <li>
                          <button className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left hover:bg-white/10">
                            <span>United Kingdom</span>
                            <span className="text-slate-300">GBP</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Desktop: search icon toggle / close */}
              <button
                type="button"
                className="hidden rounded-full p-1.5 hover:bg-white/10 md:inline-flex"
                aria-label={searchOpen ? 'Close search' : 'Open search'}
                onClick={searchOpen ? closeSearch : openSearch}
              >
                {searchOpen
                  ? <HiOutlineX className="h-5 w-5" />
                  : <HiOutlineSearch className="h-5 w-5" />
                }
              </button>

              {/* User */}
              <button
                type="button"
                className="hidden rounded-full p-1.5 hover:bg-white/10 md:inline-flex"
                aria-label="Account"
              >
                <HiOutlineUser className="h-5 w-5" />
              </button>

              {/* Shopping bag */}
              <button
                type="button"
                className="relative rounded-full p-1.5 hover:bg-white/10"
                aria-label={`Shopping bag${totalQuantity > 0 ? ` (${totalQuantity} items)` : ''}`}
              >
                <HiOutlineShoppingBag className="h-5 w-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900">
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile: hamburger */}
              <button
                type="button"
                className="ml-1 inline-flex rounded-full p-1.5 hover:bg-white/10 md:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <HiOutlineX className="h-5 w-5" />
                ) : (
                  <HiOutlineMenuAlt3 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/90 backdrop-blur-lg md:hidden">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-6 pt-20 pb-6">

            {/* Mobile search */}
            <div className="relative mb-6">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
                <HiOutlineSearch className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products…"
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-500">
                    <HiOutlineX className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Mobile search dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl">
                  {shown.length > 0 ? (
                    <>
                      <ul>
                        {shown.map((product) => (
                          <li key={product.id}>
                            <button
                              type="button"
                              onClick={() => { handleSelectProduct(product); setMenuOpen(false) }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                            >
                              <img src={product.image} alt={product.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-medium text-slate-100">{product.name}</p>
                                <p className="text-xs text-slate-500">{product.category}</p>
                              </div>
                              <span className="shrink-0 text-sm font-medium text-slate-300">{product.price}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      {hasMore && (
                        <div className="border-t border-white/5 px-4 py-3">
                          <button
                            type="button"
                            onClick={() => { closeSearch(); setMenuOpen(false); navigate('/products') }}
                            className="text-xs font-medium tracking-[0.08em] text-slate-400 hover:text-white"
                          >
                            View all {filtered.length} results →
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-6 text-center">
                      <HiOutlineSearch className="h-7 w-7 text-slate-600" />
                      <p className="text-sm font-medium text-slate-300">No products found for &ldquo;{searchQuery}&rdquo;</p>
                      <p className="text-xs text-slate-500">Try checking your spelling or browsing our categories.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <nav className="space-y-4 text-lg font-medium text-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block border-b border-white/10 pb-3 tracking-[0.08em]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile: Region & Language block at bottom */}
            <div className="mt-auto pt-6 text-xs text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-lg">
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  <HiOutlineGlobe className="h-4 w-4" />
                  <span>Region &amp; Language</span>
                </div>
                <div className="space-y-1.5 text-slate-100">
                  <div className="flex items-center justify-between rounded-xl bg-white/5 px-2 py-1.5">
                    <span className="text-xs">Nigeria</span>
                    <span className="text-xs text-slate-200">EN / NGN</span>
                  </div>
                  <p className="pt-1 text-[11px] text-slate-400">
                    Change your region and currency in settings (coming soon).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
