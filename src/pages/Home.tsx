import { Link } from 'react-router-dom'
import {
  ArrowPathIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { ButtonLink } from '../components/Button'
import { HeroCarousel, type HeroSlide, type HeroSpotlight } from '../components/HeroCarousel'
import { ProductCard } from '../components/ProductCard'
import { products, getCategories } from '../data/products'

const bestSellers = products.slice(0, 4)
const categories = getCategories()

function truncate(s: string, max: number) {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max).trimEnd()}…`
}

function buildHeroSlides(): HeroSlide[] {
  if (products.length === 0) return []
  const at = (i: number) => products[Math.min(i, products.length - 1)]

  return [
    {
      id: 'hero-intro',
      image: at(0).image,
      imageAlt: '',
      eyebrow: 'New season',
      title: 'Discover pieces that feel unmistakably yours',
      subtitle:
        'Curated jewelry, fragrance, and care — refined materials, quiet luxury, and detail you can feel every day.',
      href: '/shop',
      cta: 'Shop now',
      secondaryCta: { href: '/#categories', label: 'Categories' },
    },
    {
      id: `hero-${at(2).id}`,
      image: at(2).image,
      imageAlt: at(2).title,
      eyebrow: at(2).category,
      title: at(2).title,
      subtitle: truncate(at(2).description, 130),
      href: `/product/${at(2).id}`,
      cta: 'View piece',
    },
    {
      id: `hero-${at(5).id}`,
      image: at(5).image,
      imageAlt: at(5).title,
      eyebrow: at(5).category,
      title: at(5).title,
      subtitle: truncate(at(5).description, 130),
      href: `/product/${at(5).id}`,
      cta: 'View piece',
    },
    {
      id: `hero-${at(8).id}`,
      image: at(8).image,
      imageAlt: at(8).title,
      eyebrow: at(8).category,
      title: at(8).title,
      subtitle: truncate(at(8).description, 130),
      href: `/product/${at(8).id}`,
      cta: 'View piece',
    },
  ]
}

const heroSlides = buildHeroSlides()

const heroSpotlight: HeroSpotlight = {
  image: products[3]?.image ?? '',
  title: 'Explore new arrivals',
  href: '/shop',
}

const features = [
  {
    icon: ArrowPathIcon,
    title: 'Thoughtful materials',
    body: 'We prioritize quality ingredients, responsible sourcing, and packaging you can recycle or reuse.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality promise',
    body: 'Every piece is inspected before it ships. Reach out if something is not quite right.',
  },
  {
    icon: TruckIcon,
    title: 'Delivery & care',
    body: 'Tracked shipping on every order, plus gift-ready wrapping on qualifying purchases.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Small-batch edits',
    body: 'Limited runs and seasonal drops — designed to stay special, not everywhere.',
  },
] as const

export function Home() {
  return (
    <>
      <HeroCarousel slides={heroSlides} spotlight={heroSpotlight} />

      <section className="border-b border-cream-dark/60 bg-cream py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cream-dark/70 bg-cream-muted text-brand">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-brand">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Link
            to="/shop?category=Jewelry"
            className="group relative flex min-h-[280px] overflow-hidden rounded-3xl bg-brand shadow-lg shadow-brand/20 sm:min-h-[320px]"
          >
            <img
              src="https://images.unsplash.com/photo-1617032213177-6dd16aa4b5ad?w=900&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent sm:bg-gradient-to-r" />
            <div className="relative mt-auto flex w-full flex-col p-6 sm:justify-end sm:p-8">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                15% off
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-cream sm:text-3xl">
                Fine jewelry edit
              </h3>
              <p className="mt-2 max-w-sm text-sm text-cream/80">
                Chains, pearls, and rings — stack them or wear one standout
                piece.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cream transition-colors group-hover:text-accent">
                Shop now
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <Link
            to="/shop?category=Fragrance"
            className="group relative flex min-h-[280px] overflow-hidden rounded-3xl bg-brand shadow-lg shadow-brand/20 sm:min-h-[320px]"
          >
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent sm:bg-gradient-to-r" />
            <div className="relative mt-auto flex w-full flex-col p-6 sm:justify-end sm:p-8">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                New
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-cream sm:text-3xl">
                Scent & atmosphere
              </h3>
              <p className="mt-2 max-w-sm text-sm text-cream/80">
                Perfumes and room mists that layer beautifully from day to
                evening.
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cream transition-colors group-hover:text-accent">
                Shop now
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-brand sm:text-4xl">
            Best sellers
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-muted">
            Customer favorites — pieces that earn a permanent spot on the
            vanity or in the jewelry box.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} variant="storefront" />
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink to="/shop" size="lg" variant="outline" className="inline-flex gap-2">
            View all products
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>

      <section
        id="categories"
        className="scroll-mt-28 border-y border-cream-dark/80 bg-cream-muted py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold text-brand sm:text-4xl">
            Shop by category
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-brand-muted">
            Find your lane — each edit is intentionally small and refined.
          </p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group flex items-center justify-between rounded-2xl border border-cream-dark/70 bg-cream p-7 shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-md"
              >
                <span className="font-display text-lg font-medium text-brand group-hover:text-accent">
                  {cat}
                </span>
                <ArrowRightIcon className="h-5 w-5 text-brand-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.2),transparent_55%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Limited time
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-cream sm:text-4xl">
              Complimentary gift wrap on orders over $150
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base">
              Add a note at checkout — we will hand-wrap your selection in our
              signature cream paper with gold foil detail.
            </p>
            <ButtonLink
              to="/shop"
              size="lg"
              variant="outline"
              className="mt-10 inline-flex border-cream/35 bg-transparent text-cream hover:border-accent hover:bg-cream/5 hover:text-accent"
            >
              Browse bestsellers
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
