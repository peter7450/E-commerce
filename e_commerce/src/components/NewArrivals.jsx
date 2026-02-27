import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineCheck } from 'react-icons/hi'
import { useCart } from '../context/CartContext.jsx'

const products = [
  {
    id: 1,
    name: 'Essential Cotton Tee',
    variant: 'Navy',
    price: '₦12,500',
    imagePrimary:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    imageSecondary:
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    name: 'Relaxed Fit Chinos',
    variant: 'Olive',
    price: '₦18,900',
    imagePrimary:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    imageSecondary:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    featured: false,
  },
  {
    id: 3,
    name: 'Classic Denim Jacket',
    variant: 'Indigo',
    price: '₦32,000',
    imagePrimary:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    imageSecondary:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    featured: false,
  },
  {
    id: 4,
    name: 'Wool Blend Blazer',
    variant: 'Charcoal',
    price: '₦45,000',
    imagePrimary:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    imageSecondary:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    featured: false,
  },
  {
    id: 5,
    name: 'Linen Shirt',
    variant: 'Sand',
    price: '₦15,200',
    imagePrimary:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    imageSecondary:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    featured: false,
  },
]

export default function NewArrivals() {
  const { addToCart } = useCart()
  const [justAddedId, setJustAddedId] = useState(null)

  function handleAddToCart(product) {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.imagePrimary,
      selectedColor: null,
      selectedSize: null,
    })
    setJustAddedId(product.id)
    setTimeout(() => setJustAddedId(null), 1500)
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white">
            New Arrivals
          </h2>
          <a
            href="/products"
            className="text-sm font-bold tracking-tight text-slate-400 transition-colors hover:text-white"
          >
            View All
          </a>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className={`group flex flex-col ${
                product.featured ? 'md:col-span-2' : ''
              }`}
            >
              {/* Image container */}
              <Link to={`/product/${product.id}`} className="block">
              <div className="relative w-full overflow-hidden bg-black">
                <div className="aspect-[3/4] w-full">
                  {/* Primary image */}
                  <img
                    src={product.imagePrimary}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  {/* Secondary image (crossfade on hover) */}
                  <img
                    src={product.imageSecondary}
                    alt={`${product.name} - alternate view`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                {/* Hover action buttons - sharp edges, stark contrast */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                    className="flex flex-1 items-center justify-center gap-2 border border-white bg-white px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    {justAddedId === product.id ? (
                      <>
                        <HiOutlineCheck className="h-5 w-5" />
                        Added!
                      </>
                    ) : (
                      <>
                        <HiOutlineShoppingBag className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-white bg-white text-black transition-colors hover:bg-black hover:text-white"
                    aria-label="Add to wishlist"
                  >
                    <HiOutlineHeart className="h-5 w-5" />
                  </button>
                </div>
              </div>
              </Link>

              {/* Card details - bold, minimal, raw */}
              <div className="mt-3">
                <Link to={`/product/${product.id}`} className="font-bold tracking-tight text-white hover:text-slate-300">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm font-bold text-slate-400">
                  {product.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
