import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiOutlineHeart, HiOutlineCheck } from 'react-icons/hi'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

// Mock product data - in production, fetch by id/slug from API
const PRODUCTS = {
  '1': {
    id: '1',
    name: 'Essential Hoodie',
    slug: 'essential-hoodie',
    price: '₦28,500',
    description:
      'A premium heavyweight hoodie crafted from brushed organic cotton. Relaxed fit with kangaroo pocket and ribbed cuffs.',
    breadcrumb: ['Home', 'Men', 'Outerwear', 'Essential Hoodie'],
    colors: [
      {
        name: 'Black',
        value: '#111827',
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
          'https://images.unsplash.com/photo-1578768079052-aa76e52f2d7c?w=800&q=80',
          'https://images.unsplash.com/photo-1556821840-2a78f4aef85d?w=800&q=80',
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
        ],
      },
      {
        name: 'Heather Gray',
        value: '#6B7280',
        images: [
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
          'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80',
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
        ],
      },
      {
        name: 'Navy',
        value: '#1E3A5F',
        images: [
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        ],
      },
    ],
    sizes: [
      { value: 'S', inStock: true },
      { value: 'M', inStock: true },
      { value: 'L', inStock: false },
      { value: 'XL', inStock: true },
      { value: 'XXL', inStock: true },
    ],
    accordion: [
      {
        title: 'Product Details',
        content:
          '100% organic cotton. Brushed fleece interior. Relaxed fit. Kangaroo pocket. Ribbed cuffs and hem. Unisex sizing.',
      },
      {
        title: 'Shipping',
        content:
          'Free standard shipping on orders over ₦15,000. Express delivery available. Delivery within 5–7 business days in Nigeria.',
      },
      {
        title: 'Returns',
        content:
          '30-day hassle-free returns. Items must be unworn with tags attached. Contact support to initiate a return.',
      },
    ],
  },
}

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0)
  const [openAccordion, setOpenAccordion] = useState(null)

  const product = PRODUCTS[id] || PRODUCTS['1']
  const currentColor = product.colors[selectedColorIndex]
  const images = currentColor.images

  const handleColorChange = (index) => {
    setSelectedColorIndex(index)
    setPrimaryImageIndex(0)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      selectedColor: currentColor.name,
      selectedSize,
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs tracking-[0.08em] text-slate-400">
          {product.breadcrumb.map((item, i) => (
            <span key={item}>
              {i > 0 && <span className="mx-2">/</span>}
              <Link
                to={i === 0 ? '/' : '#'}
                className={
                  i === product.breadcrumb.length - 1
                    ? 'text-white'
                    : 'hover:text-slate-300'
                }
              >
                {item}
              </Link>
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] w-full overflow-hidden bg-slate-900">
              <img
                src={images[primaryImageIndex]}
                alt={`${product.name} - ${currentColor.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrimaryImageIndex(i)}
                  className={`aspect-square w-20 shrink-0 overflow-hidden bg-slate-900 ring-2 transition-all ${
                    primaryImageIndex === i
                      ? 'ring-white ring-offset-2 ring-offset-slate-950'
                      : 'ring-transparent hover:ring-slate-600'
                  }`}
                >
                  <img
                    src={src}
                    alt={`View ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-xl font-bold text-slate-200">
              {product.price}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Color
                </label>
                <span className="text-sm text-slate-300">
                  {currentColor.name}
                </span>
              </div>
              <div className="mt-2 flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorChange(i)}
                    className={`h-9 w-9 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-slate-950 transition-all hover:ring-slate-500 ${
                      selectedColorIndex === i
                        ? 'ring-white'
                        : 'ring-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Size
                </label>
                <a
                  href="#"
                  className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-300"
                >
                  Size Guide
                </a>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    disabled={!size.inStock}
                    onClick={() => size.inStock && setSelectedSize(size.value)}
                    className={`border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                      !size.inStock
                        ? 'cursor-not-allowed border-slate-700 text-slate-600 line-through'
                        : selectedSize === size.value
                          ? 'border-white bg-black text-white'
                          : 'border-slate-600 text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex-1 bg-black px-6 py-4 text-sm font-bold tracking-tight text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-slate-600 px-6 py-4 text-sm font-bold tracking-tight text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                <HiOutlineHeart className="h-5 w-5" />
                Add to Wishlist
              </button>
            </div>

            {/* Accordion */}
            <div className="mt-12 border-t border-slate-800 pt-8">
              {product.accordion.map((item, i) => (
                <div
                  key={item.title}
                  className="border-b border-slate-800"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === i ? null : i)
                    }
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-slate-200"
                  >
                    {item.title}
                    <span className="text-slate-500">
                      {openAccordion === i ? (
                        <HiOutlineCheck className="h-4 w-4 rotate-90" />
                      ) : (
                        <span className="text-lg">+</span>
                      )}
                    </span>
                  </button>
                  {openAccordion === i && (
                    <p className="pb-4 text-sm leading-relaxed text-slate-400">
                      {item.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
