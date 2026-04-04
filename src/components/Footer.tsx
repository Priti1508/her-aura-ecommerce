import { Link } from 'react-router-dom'
import {
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

export function Footer() {
  return (
    <footer className="w-full max-w-[100vw] overflow-x-clip border-t border-brand/20 bg-brand pb-[env(safe-area-inset-bottom,0px)] text-cream">
      <div className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2" id="about-footer">
            <p className="font-display text-xl font-semibold tracking-wide text-cream">
              HER AURA
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
              Curated essentials for modern living — jewelry, fragrance, and
              care pieces chosen for quiet luxury and everyday ease.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              About
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-accent"
                >
                  Our story
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-accent">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-accent">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-accent"
                >
                  Contact form
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
                <a
                  href="mailto:hello@heraura.com"
                  className="transition-colors hover:text-accent"
                >
                  hello@heraura.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
                <span>Los Angeles, CA</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-cream transition-colors hover:text-accent"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-cream transition-colors hover:text-accent"
                aria-label="Pinterest"
              >
                Pinterest
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-cream transition-colors hover:text-accent"
                aria-label="TikTok"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} HER AURA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-cream">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-cream">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
