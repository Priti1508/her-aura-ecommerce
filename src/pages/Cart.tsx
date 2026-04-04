import { Link } from 'react-router-dom'
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button, ButtonLink } from '../components/Button'
import { useCart } from '../context/CartContext'

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(n)
}

export function Cart() {
  const { items, setQuantity, removeItem, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-3 py-16 text-center sm:px-4 sm:py-24 md:py-28">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-muted text-brand-muted">
          <ShoppingBagIcon className="h-10 w-10" />
        </div>
        <h1 className="mt-8 font-display text-3xl font-semibold text-brand">
          Your cart is empty
        </h1>
        <p className="mt-3 text-brand-muted">
          When you add items, they will appear here. Explore the collection to
          find something you love.
        </p>
        <ButtonLink to="/shop" size="lg" className="mt-10">
          Continue shopping
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <h1 className="font-display text-3xl font-semibold text-brand sm:text-4xl">
        Cart
      </h1>
      <p className="mt-2 text-brand-muted">{items.length} line item(s)</p>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-14">
        <ul className="min-w-0 flex-1 space-y-4">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl border border-cream-dark/60 bg-cream p-4 shadow-sm transition-shadow hover:shadow-md min-[500px]:flex-row sm:p-5"
            >
              <Link
                to={`/product/${product.id}`}
                className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-cream-muted min-[500px]:mx-0 min-[500px]:h-24 min-[500px]:w-24 sm:h-28 sm:w-28"
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between min-[500px]:gap-4">
                <div className="min-w-0 text-center min-[500px]:text-left">
                  <Link
                    to={`/product/${product.id}`}
                    className="break-words font-display font-medium text-brand transition-colors hover:text-accent"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-sm text-brand-muted">
                    {product.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand">
                    {formatPrice(product.price)} each
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center gap-3 min-[500px]:mt-0 min-[500px]:justify-start">
                  <div className="flex items-center rounded-full border border-cream-dark bg-cream-muted p-0.5">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-cream"
                      onClick={() =>
                        setQuantity(product.id, quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-cream"
                      onClick={() =>
                        setQuantity(product.id, quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.title}`}
                    className="rounded-full p-2 text-brand-muted transition-colors hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeItem(product.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="w-full lg:w-96 lg:shrink-0">
          <div className="rounded-2xl border border-cream-dark/60 bg-cream-muted p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto xl:top-20">
            <h2 className="font-display text-lg font-semibold text-brand">
              Order summary
            </h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-brand-muted">
                <dt>Subtotal</dt>
                <dd className="font-medium text-brand">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between text-brand-muted">
                <dt>Shipping</dt>
                <dd className="font-medium text-brand">Calculated next</dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-between border-t border-cream-dark pt-6 font-display text-lg font-semibold text-brand">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Button size="lg" className="mt-8 w-full" type="button">
              Checkout
            </Button>
            <p className="mt-4 text-center text-xs text-brand-muted">
              UI preview only — no payment is processed.
            </p>
            <Link
              to="/shop"
              className="mt-4 block text-center text-sm font-medium text-accent hover:text-accent-hover"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
