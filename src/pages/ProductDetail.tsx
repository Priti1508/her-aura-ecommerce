import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '../components/Button'
import { useCart } from '../context/CartContext'
import { getProductById, products } from '../data/products'

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addedFlash, setAddedFlash] = useState(false)

  const product = id ? getProductById(id) : undefined

  useEffect(() => {
    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(t)
  }, [id])

  useEffect(() => {
    setActiveImage(0)
    setQty(1)
  }, [id])

  if (!loading && !product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-brand">
          Product not found
        </h1>
        <p className="mt-2 text-brand-muted">
          This item may have moved. Browse the shop for similar pieces.
        </p>
        <Button className="mt-8" onClick={() => navigate('/shop')}>
          Back to shop
        </Button>
      </div>
    )
  }

  if (loading || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-4 w-32 animate-pulse rounded bg-cream-dark" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square animate-pulse rounded-2xl bg-gradient-to-br from-cream-muted to-cream-dark" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-cream-dark"
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-20 animate-pulse rounded bg-cream-dark" />
            <div className="h-10 w-4/5 animate-pulse rounded-lg bg-cream-dark" />
            <div className="h-8 w-28 animate-pulse rounded-lg bg-cream-dark" />
            <div className="space-y-2 pt-4">
              <div className="h-3 w-full animate-pulse rounded bg-cream-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-cream-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-cream-muted" />
            </div>
            <div className="mt-8 flex gap-4">
              <div className="h-12 w-36 animate-pulse rounded-full bg-cream-dark" />
              <div className="h-12 flex-1 animate-pulse rounded-full bg-cream-dark" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const images = product.images.length ? product.images : [product.image]

  function handleAddToCart() {
    if (!product) return
    addItem(product, qty)
    setAddedFlash(true)
    window.setTimeout(() => setAddedFlash(false), 2000)
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm font-medium tracking-wide text-brand-muted transition-colors hover:text-accent"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-2xl border border-cream-dark/60 bg-cream-muted shadow-lg shadow-brand/10">
            <img
              src={images[activeImage]}
              alt=""
              className="aspect-square w-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  i === activeImage
                    ? 'border-accent ring-2 ring-accent/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-brand sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            {product.compareAtPrice != null &&
            product.compareAtPrice > product.price ? (
              <>
                <span className="text-lg text-brand-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                <span className="text-2xl font-bold text-sale sm:text-3xl">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-md bg-cream-dark/80 px-2 py-1 text-xs font-medium text-brand-muted">
                  You save{' '}
                  {formatPrice(product.compareAtPrice - product.price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-brand sm:text-3xl">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="mt-6 text-base leading-relaxed text-brand-muted">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-cream-dark bg-cream-muted p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium text-brand-muted transition-colors hover:bg-cream hover:shadow-sm"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-semibold text-brand">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium text-brand-muted transition-colors hover:bg-cream hover:shadow-sm"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <Button
              size="lg"
              className="min-w-[200px]"
              onClick={handleAddToCart}
            >
              {addedFlash ? 'Added to cart' : 'Add to cart'}
            </Button>
          </div>

          <p className="mt-6 text-xs text-brand-muted">
            Free standard shipping on orders over $75. Returns within 30 days.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-cream-dark pt-16">
          <h2 className="font-display text-2xl font-semibold text-brand">
            You may also like
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group overflow-hidden rounded-2xl border border-cream-dark/60 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-cream-muted">
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-display font-medium text-brand group-hover:text-accent">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-brand">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
