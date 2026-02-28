import { useEffect } from 'react'
import { HiOutlineX, HiOutlineTrash, HiOutlineShoppingBag } from 'react-icons/hi'
import { useCart, parsePrice } from '../context/CartContext'

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    variantKey,
    totalQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIsCartOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setIsCartOpen])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  const formattedSubtotal = `₦${subtotal.toLocaleString('en-NG')}`

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-white">
              Your Cart
            </h2>
            {totalQuantity > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900">
                {totalQuantity}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close cart"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <HiOutlineShoppingBag className="h-14 w-14 text-slate-700" />
              <p className="text-sm font-medium text-slate-400">Your cart is empty</p>
              <p className="text-xs text-slate-600">Add items to get started.</p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 border border-white/10 px-5 py-2 text-xs font-medium tracking-[0.08em] text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {cartItems.map((item) => {
                const key = variantKey(item)
                const unitPrice = parsePrice(item.price)
                const lineTotal = `₦${(unitPrice * item.quantity).toLocaleString('en-NG')}`

                return (
                  <li key={key} className="flex gap-4 border-b border-white/5 pb-5 last:border-0">
                    {/* Thumbnail */}
                    <div className="h-24 w-20 shrink-0 overflow-hidden bg-slate-800">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <HiOutlineShoppingBag className="h-6 w-6 text-slate-600" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium leading-snug text-white">
                          {item.name}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                          {item.selectedSize && item.selectedSize !== 'none' && (
                            <span className="text-xs text-slate-500">
                              Size: <span className="text-slate-400">{item.selectedSize}</span>
                            </span>
                          )}
                          {item.selectedColor && item.selectedColor !== 'none' && (
                            <span className="text-xs text-slate-500">
                              Color: <span className="text-slate-400">{item.selectedColor}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-white/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center text-xs font-medium tabular-nums text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total + remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-slate-200">
                            {lineTotal}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(key)}
                            className="text-slate-600 transition-colors hover:text-red-400"
                            aria-label={`Remove ${item.name}`}
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-slate-400">Subtotal</span>
              <span className="text-base font-semibold text-white">{formattedSubtotal}</span>
            </div>
            <p className="mb-4 text-xs text-slate-600">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              type="button"
              className="w-full bg-white py-4 text-sm font-bold tracking-tight text-slate-900 transition-colors hover:bg-slate-200"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
