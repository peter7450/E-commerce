import { useState } from 'react'
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const { totalQuantity } = useCart()

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-4 sm:px-6">
          <div className="flex h-12 flex-1 items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-4 text-slate-100 shadow-lg backdrop-blur-lg sm:px-6">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-900">
                LOGO
              </div>
              <span className="hidden text-sm font-medium tracking-tight sm:inline">
                YourBrand
              </span>
            </div>

            {/* Center: Desktop links */}
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

            {/* Right: Region selector + Icons / mobile controls */}
            <div className="relative flex items-center gap-2">
              {/* Desktop: Region & Language selector */}
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

              {/* Desktop: search + user */}
              <button
                type="button"
                className="hidden rounded-full p-1.5 hover:bg-white/10 md:inline-flex"
                aria-label="Search"
              >
                <HiOutlineSearch className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="hidden rounded-full p-1.5 hover:bg-white/10 md:inline-flex"
                aria-label="Account"
              >
                <HiOutlineUser className="h-5 w-5" />
              </button>

              {/* Shopping bag (always visible) */}
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
          <div className="mx-auto flex h-full max-w-6xl flex-col px-6 pt-24 pb-6">
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
