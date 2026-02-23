import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addToCart(product) {
    setCartItems((prev) => {
      const variantKey = (item) =>
        `${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`
      const newKey = variantKey(product)
      const existing = prev.find((item) => variantKey(item) === newKey)
      if (existing) {
        return prev.map((item) =>
          variantKey(item) === newKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    cartItems,
    addToCart,
    totalQuantity,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
