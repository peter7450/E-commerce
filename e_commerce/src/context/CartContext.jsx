import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

const variantKey = (item) =>
  `${item.id}-${item.selectedColor ?? 'none'}-${item.selectedSize ?? 'none'}`

// Parse "₦28,500" → 28500
function parsePrice(priceStr) {
  return Number(String(priceStr).replace(/[^0-9.]/g, '')) || 0
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [duplicateToast, setDuplicateToast] = useState(null) // { message, id }

  const showDuplicateToast = useCallback((message) => {
    const id = Date.now()
    setDuplicateToast({ message, id })
    setTimeout(() => setDuplicateToast((t) => (t?.id === id ? null : t)), 3000)
  }, [])

  function addToCart(product) {
    const key = variantKey(product)
    const existing = cartItems.find((item) => variantKey(item) === key)

    if (existing) {
      showDuplicateToast('You have already picked this exact item.')
      return
    }

    setCartItems((prev) => [...prev, { ...product, quantity: 1 }])
  }

  function removeFromCart(key) {
    setCartItems((prev) => prev.filter((item) => variantKey(item) !== key))
  }

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  )

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    variantKey,
    totalQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    duplicateToast,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
