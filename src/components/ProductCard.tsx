import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import type { Product } from '../types/product'

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

type ProductCardProps = {
  product: Product
  /** Tighter layout for homepage grids (mockup-style). */
  variant?: 'full' | 'storefront' | 'listing'
}

export function ProductCard({ product, variant = 'full' }: ProductCardProps) {
  const isStorefront = variant === 'storefront'
  const isListing = variant === 'listing'
  const compare =
    product.compareAtPrice != null && product.compareAtPrice > product.price
      ? product.compareAtPrice
      : null
  const saveAmount = compare != null ? compare - product.price : 0
  const rating = product.rating

  const imgAspect = isListing
    ? 'aspect-[3/4] sm:aspect-[3/4]'
    : 'aspect-square'

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-cream shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
        isListing
          ? 'border-cream-dark/40 hover:border-brand/25'
          : 'border-cream-dark/50 shadow-brand/[0.05] hover:border-accent/40 hover:shadow-brand/[0.08]'
      } ${isStorefront ? 'text-left' : ''}`}
    >
      <div
        className={`relative overflow-hidden bg-cream-muted ${
          isListing ? 'rounded-t-2xl' : isStorefront ? 'rounded-t-2xl' : ''
        } ${imgAspect}`}
      >
        <img
          src={product.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!isListing && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-0.5 text-xs font-medium tracking-wide text-brand-muted shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        )}
      </div>
      <div
        className={`flex flex-1 flex-col ${
          isListing ? 'p-4 sm:p-5' : isStorefront ? 'p-4 sm:p-5' : 'p-5 sm:p-6'
        }`}
      >
        {isListing && (
          <p className="text-xs font-medium uppercase tracking-wider text-brand-muted">
            {product.category}
          </p>
        )}
        <h3
          className={`font-display leading-snug text-brand transition-colors group-hover:text-accent ${
            isListing
              ? 'mt-1 text-lg font-semibold sm:text-xl'
              : isStorefront
                ? 'text-base font-semibold'
                : 'text-lg font-medium'
          }`}
        >
          {product.title}
        </h3>
        {rating != null && !isListing && (
          <div className="mt-2 flex items-center gap-1.5">
            <StarIcon className="h-4 w-4 text-accent" aria-hidden />
            <span className="text-sm font-medium tabular-nums text-brand">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
        {!isStorefront && !isListing && (
          <p className="mt-2 text-sm text-brand-muted line-clamp-2">
            {product.description}
          </p>
        )}
        {isListing && compare != null ? (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm text-brand-muted line-through">
                {formatPrice(compare)}
              </span>
              <span className="text-lg font-bold text-sale sm:text-xl">
                {formatPrice(product.price)}
              </span>
            </div>
            {saveAmount > 0 && (
              <p className="inline-block rounded-md bg-cream-dark/80 px-2.5 py-1 text-xs font-medium text-brand-muted">
                You save {formatPrice(saveAmount)}
              </p>
            )}
          </div>
        ) : (
          <div
            className={`mt-auto flex flex-wrap items-baseline gap-2 ${isStorefront ? 'pt-3' : 'pt-4'}`}
          >
            <span className="text-base font-bold text-brand">
              {formatPrice(product.price)}
            </span>
            {compare != null && (
              <span className="text-sm text-brand-muted line-through">
                {formatPrice(compare)}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
