import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useCart } from '../context/CartContext'

/**
 * Universal wishlist toggle button.
 *
 * Props:
 *   product   – the product object to wishlist
 *   className – Tailwind classes for the <button> wrapper
 *   showLabel – if true, renders text next to the icon (e.g. for PDPs)
 */
export default function WishlistButton({ product, className = '', showLabel = false }) {
  const { toggleWishlist, isInWishlist } = useCart()
  const wishlisted = isInWishlist(product)

  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={wishlisted}
      className={className}
    >
      {wishlisted ? (
        <HiHeart className="h-5 w-5 text-red-500" />
      ) : (
        <HiOutlineHeart className="h-5 w-5" />
      )}
      {showLabel && (
        <span>{wishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
      )}
    </button>
  )
}
