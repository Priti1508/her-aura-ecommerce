import { useState, type FormEvent } from 'react'
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { useCart } from '../context/CartContext'

const linkClass =
  'text-sm font-medium tracking-wide text-brand-muted transition-colors hover:text-brand'

const activeClass =
  'text-brand underline decoration-accent decoration-2 underline-offset-8'

export function Navbar() {
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    setSearchOpen(false)
    if (q) navigate(`/shop?q=${encodeURIComponent(q)}`)
    else navigate('/shop')
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark/70 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex w-fit shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="HER AURA home"
        >
          <img
            src={logoImg}
            alt="HER AURA"
            className="h-9 w-auto rounded-sm object-contain sm:h-10"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-7 lg:gap-9 xl:flex"
          aria-label="Main"
        >
          <Link to="/#categories" className={linkClass}>
            Categories
          </Link>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            About
          </NavLink>
          <a href="#" className={linkClass}>
            Journal
          </a>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-brand transition-colors hover:bg-cream-muted"
            aria-expanded={searchOpen}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-brand transition-colors hover:bg-cream-muted"
            aria-label={`Shopping cart, ${totalItems} items`}
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-brand transition-colors hover:bg-cream-muted sm:flex"
            aria-label="Account"
          >
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-cream-dark/50 bg-cream px-4 py-3 sm:px-6">
          <form
            onSubmit={submitSearch}
            className="mx-auto flex max-w-2xl gap-2"
            role="search"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewelry, fragrance, skincare…"
              className="min-w-0 flex-1 rounded-full border border-cream-dark bg-cream-muted/50 px-4 py-2.5 text-sm text-brand outline-none transition-shadow placeholder:text-brand-muted focus:border-accent focus:ring-2 focus:ring-accent/25"
              autoFocus
              aria-label="Search products"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-brand-hover"
            >
              Search
            </button>
          </form>
        </div>
      )}

      <nav
        className="flex border-t border-cream-dark/50 px-4 py-2 xl:hidden"
        aria-label="Mobile"
      >
        <div className="mx-auto flex w-full max-w-lg flex-wrap justify-center gap-x-5 gap-y-2">
          <Link
            to="/#categories"
            className="text-sm font-medium tracking-wide text-brand-muted"
          >
            Categories
          </Link>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide ${isActive ? 'text-accent' : 'text-brand-muted'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide ${isActive ? 'text-accent' : 'text-brand-muted'}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide ${isActive ? 'text-accent' : 'text-brand-muted'}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide ${isActive ? 'text-accent' : 'text-brand-muted'}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-sm font-medium tracking-wide ${isActive ? 'text-accent' : 'text-brand-muted'}`
            }
          >
            Cart
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
