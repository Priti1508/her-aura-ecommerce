import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ButtonLink } from '../components/Button'

const values = [
  {
    title: 'Sustainable practices',
    body:
      'We favor responsible materials, mindful packaging, and partners who align with our standards for people and planet.',
  },
  {
    title: 'Premium quality',
    body:
      'Every piece is chosen for lasting finish and honest craft — from fine metals and stones to small-batch fragrance and skincare.',
  },
  {
    title: 'Personal curation',
    body:
      'Our edits stay intentionally small so you spend less time scrolling and more time finding pieces that feel like you.',
  },
] as const

const studioImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'

export function About() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand-muted transition-colors hover:text-brand"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <div
              className="pointer-events-none absolute -left-8 top-1/4 hidden h-72 w-72 rounded-full bg-accent/10 blur-3xl lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-4 bottom-8 h-48 w-48 rounded-full border border-cream-dark/30 opacity-60"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -12deg,
                  transparent,
                  transparent 8px,
                  rgba(61, 43, 31, 0.06) 8px,
                  rgba(61, 43, 31, 0.06) 9px
                )`,
              }}
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-3xl border border-cream-dark/40 bg-cream-muted shadow-lg shadow-brand/10">
              <img
                src={studioImage}
                alt=""
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
              />
            </div>
          </div>

          <div>
            <p className="font-display text-lg italic text-accent">
              Elevating the rituals of every day
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
              About us
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-brand-muted">
              <p>
                HER AURA began as a quiet response to fast, noisy retail — a
                place to discover jewelry, fragrance, and care that reward
                attention without demanding it.
              </p>
              <p>
                We work with makers and labs who share our respect for
                materials and meaning. Each drop is edited like a small
                exhibition: fewer pieces, clearer stories, and room for you to
                make them your own.
              </p>
              <p>
                Whether you are building a signature scent, a stack of rings, or
                a simple shelf of well-made essentials, we are glad you are
                here.
              </p>
            </div>
            <ButtonLink to="/shop" size="lg" className="mt-10 inline-flex">
              Shop the collection
            </ButtonLink>
          </div>
        </div>

        <section className="mt-20 border-t border-cream-dark/50 pt-20 lg:mt-28 lg:pt-24">
          <h2 className="text-center font-display text-2xl font-semibold text-brand sm:text-3xl">
            What we stand for
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-brand-muted">
            Three principles guide how we choose, present, and stand behind
            every piece.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map(({ title, body }) => (
              <article
                key={title}
                className="rounded-3xl border border-cream-dark/40 bg-page px-6 py-8 shadow-sm"
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
