import { Link } from 'react-router-dom'
import { HiOutlineHeart, HiOutlineShoppingBag, HiOutlineTrash } from 'react-icons/hi'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, moveToCart, setIsCartOpen } = useCart()

  function handleMoveToCart(product) {
    moveToCart(product)
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-2 text-lg font-normal text-slate-500">
                ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
          <Link
            to="/"
            className="text-sm font-medium tracking-tight text-slate-400 transition-colors hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Empty state */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-32 text-center">
            <HiOutlineHeart className="h-20 w-20 text-slate-800" />
            <p className="text-lg font-semibold text-slate-300">
              Your wishlist is empty.
            </p>
            <p className="max-w-sm text-sm text-slate-500">
              Save your favourite pieces here. Tap the heart icon on any product to add it.
            </p>
            <Link
              to="/"
              className="mt-2 border border-white/10 px-6 py-3 text-sm font-medium tracking-[0.08em] text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((product, index) => (
              <article
                key={`${product.id}-${index}`}
                className="group flex flex-col"
              >
                {/* Image container */}
                <div className="relative w-full overflow-hidden bg-black">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-[3/4] w-full">
                      <img
                        src={product.image || product.imagePrimary}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Remove from wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-red-400 backdrop-blur-sm transition-colors hover:bg-slate-900"
                    aria-label="Remove from wishlist"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>

                  {/* Move to Cart overlay */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(product)}
                      className="flex w-full items-center justify-center gap-2 border border-white bg-white py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
                    >
                      <HiOutlineShoppingBag className="h-5 w-5" />
                      Move to Cart
                    </button>
                  </div>
                </div>

                {/* Card details */}
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-bold tracking-tight text-white hover:text-slate-300"
                    >
                      {product.name}
                    </Link>
                    {product.selectedColor && product.selectedColor !== 'none' && (
                      <p className="mt-0.5 text-xs text-slate-500">{product.selectedColor}</p>
                    )}
                  </div>
                  <p className="shrink-0 pl-4 text-sm font-bold text-slate-300">
                    {product.price}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
