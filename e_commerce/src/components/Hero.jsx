import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    headline: 'Summer Collection',
    subheadline: 'Discover the latest trends in fashion',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    headline: 'New Arrivals',
    subheadline: 'Fresh styles for every occasion',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    headline: 'Premium Essentials',
    subheadline: 'Quality meets elegance',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
    headline: 'Limited Edition',
    subheadline: 'Exclusive pieces for the discerning',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Reset progress when slide changes
    setProgress(0)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / 70) // 70 steps over 7 seconds (100ms per step)
      })
    }, 100)

    // Auto-advance slide every 7 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(slideInterval)
    }
  }, [currentSlide])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Image Slider */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="h-full w-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h1 className="mb-4 text-5xl font-light tracking-tight sm:text-6xl md:text-7xl">
            {slides[currentSlide].headline}
          </h1>
          <p className="mb-8 text-lg font-light tracking-[0.08em] text-slate-200 sm:text-xl">
            {slides[currentSlide].subheadline}
          </p>
          <button className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium tracking-[0.08em] backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50">
            Shop Now
          </button>
        </div>
      </div>

      {/* Pagination & Counter */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        {/* Progress Dashes */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative h-0.5 w-12 cursor-pointer bg-white/30 transition-all hover:bg-white/50"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress bar for active slide */}
              {index === currentSlide && (
                <div
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
              {/* Full width on hover for inactive slides */}
              {index !== currentSlide && (
                <div className="absolute left-0 top-0 h-full w-0 bg-white transition-all group-hover:w-full" />
              )}
            </button>
          ))}
        </div>

        {/* Numerical Counter */}
        <div className="flex items-center gap-1 text-xs font-medium tracking-[0.16em] text-white/80">
          <span className="tabular-nums">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/40">/</span>
          <span className="tabular-nums text-white/60">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
