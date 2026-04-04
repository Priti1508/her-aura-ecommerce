import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { ButtonLink } from './Button'

export type HeroSlide = {
  id: string
  image: string
  imageAlt?: string
  eyebrow: string
  title: string
  subtitle: string
  href: string
  cta: string
  secondaryCta?: { href: string; label: string }
}

export type HeroSpotlight = {
  image: string
  title: string
  href: string
}

const AUTO_MS = 6500

type HeroCarouselProps = {
  slides: HeroSlide[]
  spotlight?: HeroSpotlight
}

export function HeroCarousel({ slides, spotlight }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = slides.length
  const go = useCallback(
    (index: number) => {
      if (count === 0) return
      const next = ((index % count) + count) % count
      setActive(next)
    },
    [count],
  )

  const goPrev = useCallback(() => go(active - 1), [active, go])
  const goNext = useCallback(() => go(active + 1), [active, go])

  useEffect(() => {
    if (count <= 1 || paused) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [count, paused])

  if (count === 0) return null

  const slide = slides[active]
  const showSpotlight = Boolean(spotlight && active === 0)

  return (
    <section
      className="relative w-full max-w-[100vw] overflow-hidden bg-brand"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((s, i) => (
            <article
              key={s.id}
              className="relative min-w-full shrink-0"
              aria-hidden={i !== active}
              inert={i !== active ? true : undefined}
            >
              <div className="relative aspect-[4/5] min-h-[min(72svh,520px)] sm:aspect-[2.2/1] sm:min-h-[min(68svh,480px)] md:min-h-[min(70svh,520px)] lg:aspect-[2.4/1] lg:min-h-[min(72svh,560px)]">
                <img
                  src={s.image}
                  alt={s.imageAlt ?? ''}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-brand/30 sm:bg-gradient-to-r sm:from-brand sm:via-brand/45 sm:to-brand/10"
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-end sm:items-center">
                  <div className="mx-auto w-full max-w-7xl px-3 pb-12 pt-6 text-left min-[400px]:px-4 sm:px-6 sm:pb-20 sm:pt-0 lg:px-8">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent min-[400px]:text-xs min-[400px]:tracking-[0.25em]">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,5.5vw+0.6rem,3.75rem)] font-semibold leading-[1.12] tracking-tight text-cream sm:mt-4">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/85 min-[400px]:mt-5 sm:text-base lg:text-lg">
                      {s.subtitle}
                    </p>
                    <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center sm:mt-10 sm:max-w-none sm:gap-4">
                      <ButtonLink
                        to={s.href}
                        variant="hero"
                        size="lg"
                        className="inline-flex w-full justify-center gap-2 shadow-lg shadow-black/25 min-[480px]:w-auto min-[480px]:justify-center"
                      >
                        {s.cta}
                        <ArrowRightIcon className="h-4 w-4 shrink-0" />
                      </ButtonLink>
                      {s.secondaryCta && (
                        <ButtonLink
                          to={s.secondaryCta.href}
                          variant="heroGhost"
                          size="lg"
                          className="inline-flex w-full justify-center gap-2 min-[480px]:w-auto"
                        >
                          {s.secondaryCta.label}
                          <ArrowRightIcon className="h-4 w-4 shrink-0" />
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showSpotlight && spotlight && (
          <Link
            to={spotlight.href}
            className="absolute right-4 top-4 z-20 hidden max-w-[200px] overflow-hidden rounded-2xl border border-cream/25 bg-cream p-3 shadow-2xl shadow-black/20 transition-transform hover:scale-[1.02] sm:right-6 sm:top-6 sm:block sm:max-w-[220px] lg:max-w-[240px]"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-cream-muted">
              <img
                src={spotlight.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 flex items-center justify-between gap-2 text-sm font-semibold text-brand">
              <span className="leading-snug">{spotlight.title}</span>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-accent" />
            </p>
          </Link>
        )}

        {count > 1 && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-1 min-[400px]:px-2 sm:px-4">
              <button
                type="button"
                onClick={goPrev}
                className="pointer-events-auto flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-cream/20 hover:text-accent sm:h-11 sm:w-11"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="pointer-events-auto flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-cream/20 hover:text-accent sm:h-11 sm:w-11"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>

            <div
              className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-7"
              role="tablist"
              aria-label="Slide indicators"
            >
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-cream/40 hover:bg-cream/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {slide ? `Slide ${active + 1} of ${count}: ${slide.title}` : ''}
      </p>
    </section>
  )
}
