import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type FormEvent,
  type ReactNode,
  type SetStateAction,
} from 'react'
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { products, getCategories } from '../data/products'
import type { Product } from '../types/product'

type SortKey = 'default' | 'price-asc' | 'price-desc'

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list]
  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price)
  return copy
}

function FilterAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream/20 bg-cream/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left transition-colors hover:bg-cream/10"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold tracking-wide text-cream">
          {title}
        </span>
        <ChevronRightIcon
          className={`h-5 w-5 shrink-0 text-cream/70 transition-transform duration-200 ${
            open ? 'rotate-90' : ''
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-cream/15 px-4 py-4 text-cream/95">
          {children}
        </div>
      )}
    </div>
  )
}

function SidebarFilters({
  category,
  categories,
  applyCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  sort,
  setSort,
  resetFilters,
  openAcc,
  setOpenAcc,
}: {
  category: string
  categories: string[]
  applyCategory: (next: string) => void
  minPrice: string
  maxPrice: string
  setMinPrice: (v: string) => void
  setMaxPrice: (v: string) => void
  sort: SortKey
  setSort: (v: SortKey) => void
  resetFilters: () => void
  openAcc: { categories: boolean; price: boolean; sort: boolean }
  setOpenAcc: Dispatch<
    SetStateAction<{
      categories: boolean
      price: boolean
      sort: boolean
    }>
  >
}) {
  return (
    <div className="space-y-4">
      <div className="mb-8 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 bg-cream/10">
              <FunnelIcon className="h-5 w-5 text-cream" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                Filters
              </h2>
              <p className="mt-1 text-sm text-cream/65">
                Refine your selection
              </p>
            </div>
          </div>
        </div>
      </div>

      <FilterAccordion
        title="Categories"
        open={openAcc.categories}
        onToggle={() =>
          setOpenAcc((o) => ({ ...o, categories: !o.categories }))
        }
      >
        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="radio"
              name="cat-sidebar"
              checked={category === ''}
              onChange={() => applyCategory('')}
              className="h-4 w-4 border-cream/40 text-accent focus:ring-accent"
            />
            <span>All</span>
          </label>
          {categories.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="radio"
                name="cat-sidebar"
                checked={category === c}
                onChange={() => applyCategory(c)}
                className="h-4 w-4 border-cream/40 text-accent focus:ring-accent"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      <FilterAccordion
        title="Price range"
        open={openAcc.price}
        onToggle={() => setOpenAcc((o) => ({ ...o, price: !o.price }))}
      >
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-xl border border-cream/25 bg-brand-hover/50 px-3 py-2.5 text-sm text-cream placeholder:text-cream/45 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-xl border border-cream/25 bg-brand-hover/50 px-3 py-2.5 text-sm text-cream placeholder:text-cream/45 outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </FilterAccordion>

      <FilterAccordion
        title="Sort"
        open={openAcc.sort}
        onToggle={() => setOpenAcc((o) => ({ ...o, sort: !o.sort }))}
      >
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="w-full rounded-xl border border-cream/25 bg-brand-hover/50 px-3 py-2.5 text-sm text-cream outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="default" className="text-brand">
            Featured
          </option>
          <option value="price-asc" className="text-brand">
            Price: Low to high
          </option>
          <option value="price-desc" className="text-brand">
            Price: High to low
          </option>
        </select>
      </FilterAccordion>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full pt-2 text-sm font-medium text-cream/80 underline-offset-4 transition-colors hover:text-accent"
      >
        Clear all filters
      </button>
    </div>
  )
}

export function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') ?? ''
  const queryParam = (searchParams.get('q') ?? '').trim().toLowerCase()
  const categories = getCategories()

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [category, setCategory] = useState(categoryParam)
  const [sort, setSort] = useState<SortKey>('default')
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get('q') ?? '',
  )
  const [openAcc, setOpenAcc] = useState({
    categories: true,
    price: false,
    sort: false,
  })

  useEffect(() => {
    setCategory(categoryParam)
  }, [categoryParam])

  useEffect(() => {
    setSearchInput(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    const t = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(t)
  }, [category, minPrice, maxPrice, sort, queryParam])

  const filtered = useMemo(() => {
    let list = products
    if (queryParam) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(queryParam) ||
          p.description.toLowerCase().includes(queryParam) ||
          p.category.toLowerCase().includes(queryParam),
      )
    }
    if (category) {
      list = list.filter((p) => p.category === category)
    }
    const min = minPrice === '' ? null : Number(minPrice)
    const max = maxPrice === '' ? null : Number(maxPrice)
    if (min !== null && !Number.isNaN(min)) {
      list = list.filter((p) => p.price >= min)
    }
    if (max !== null && !Number.isNaN(max)) {
      list = list.filter((p) => p.price <= max)
    }
    return sortProducts(list, sort)
  }, [category, minPrice, maxPrice, sort, queryParam])

  function applyCategory(next: string) {
    setCategory(next)
    const params = new URLSearchParams(searchParams)
    if (next) params.set('category', next)
    else params.delete('category')
    setSearchParams(params, { replace: true })
  }

  function resetFilters() {
    setMinPrice('')
    setMaxPrice('')
    setCategory('')
    setSort('default')
    setSearchParams({}, { replace: true })
    setSearchInput('')
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    const q = searchInput.trim()
    if (q) params.set('q', q)
    else params.delete('q')
    setSearchParams(params, { replace: true })
  }

  const sidebarProps = {
    category,
    categories,
    applyCategory,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    sort,
    setSort,
    resetFilters,
    openAcc,
    setOpenAcc,
  }

  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-clip bg-page">
      <div className="flex min-h-dvh flex-col lg:flex-row">
        <aside className="hidden w-[min(100%,300px)] max-w-full shrink-0 bg-brand lg:block lg:sticky lg:top-[5.25rem] lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto lg:self-start lg:px-6 lg:py-8 xl:top-[4.75rem] xl:max-h-[calc(100dvh-5rem)] xl:w-[320px] xl:px-9 xl:py-10">
          <SidebarFilters {...sidebarProps} />
        </aside>

        <main className="min-w-0 flex-1 px-3 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream-dark/60 bg-cream text-brand transition-colors hover:border-brand/30 hover:bg-cream-muted"
                aria-label="Back to home"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-cream-dark/60 bg-cream px-4 py-2.5 text-sm font-medium text-brand lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
              </button>
            </div>

            <form
              onSubmit={submitSearch}
              className="relative flex min-w-0 flex-1"
              role="search"
            >
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products…"
                className="h-12 w-full rounded-full border border-cream-dark/50 bg-cream py-2 pl-12 pr-4 text-sm text-brand shadow-sm outline-none transition-shadow placeholder:text-brand-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
                aria-label="Search products"
              />
            </form>

            <p className="shrink-0 text-center text-xs font-medium tabular-nums text-brand-muted min-[400px]:text-sm sm:text-right">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} variant="listing" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-dark bg-cream py-24 text-center">
                <p className="font-display text-2xl text-brand">No matches</p>
                <p className="mt-2 max-w-sm text-sm text-brand-muted">
                  Try different filters or search terms — or clear everything
                  to browse the full collection.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-8 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} variant="listing" />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-brand/60 backdrop-blur-sm"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full max-h-dvh w-full max-w-[min(100%,24rem)] flex-col bg-brand shadow-2xl">
            <div className="flex items-center justify-end border-b border-cream/15 p-4">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-cream hover:bg-cream/10"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-4">
              <SidebarFilters {...sidebarProps} />
            </div>
            <div className="border-t border-cream/15 p-4">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-full bg-cream py-3 text-sm font-semibold text-brand"
              >
                View results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
