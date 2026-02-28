/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export const variantKey = (item) =>
  `${item.id}-${item.selectedColor ?? 'none'}-${item.selectedSize ?? 'none'}`

// Parse "₦28,500" → 28500
// eslint-disable-next-line react-refresh/only-export-components
export function parsePrice(priceStr) {
  return Number(String(priceStr).replace(/[^0-9.]/g, '')) || 0
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // --- Cart ---
  function addToCart(product) {
    setCartItems((prev) => {
      const key = variantKey(product)
      const existing = prev.find((item) => variantKey(item) === key)
      if (existing) {
        return prev.map((item) =>
          variantKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(key) {
    setCartItems((prev) => prev.filter((item) => variantKey(item) !== key))
  }

  function updateQuantity(key, newQty) {
    if (newQty <= 0) {
      removeFromCart(key)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        variantKey(item) === key ? { ...item, quantity: newQty } : item
      )
    )
  }

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  )

  // --- Wishlist ---
  function toggleWishlist(product) {
    const key = variantKey(product)
    setWishlistItems((prev) => {
      const exists = prev.find((item) => variantKey(item) === key)
      return exists
        ? prev.filter((item) => variantKey(item) !== key)
        : [...prev, product]
    })
  }

  function isInWishlist(product) {
    return wishlistItems.some((item) => variantKey(item) === variantKey(product))
  }

  function moveToCart(product) {
    addToCart(product)
    const key = variantKey(product)
    setWishlistItems((prev) => prev.filter((item) => variantKey(item) !== key))
  }

  const value = {
    // cart
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    variantKey,
    totalQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    // wishlist
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    moveToCart,
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
