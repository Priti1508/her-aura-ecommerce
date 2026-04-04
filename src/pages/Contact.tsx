import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { EnvelopeIcon as EnvelopeSolid } from '@heroicons/react/24/solid'

const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=1248+Melrose+Ave+Los+Angeles+CA+90046&z=14&output=embed'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
    setName('')
    setEmail('')
    setMessage('')
    window.setTimeout(() => setSent(false), 5000)
  }

  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-clip bg-page py-8 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-brand-muted transition-colors hover:text-brand"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-8 overflow-hidden rounded-2xl border border-cream-dark/35 bg-cream shadow-2xl shadow-brand/15 min-[400px]:rounded-3xl sm:mt-10 lg:flex lg:min-h-[560px]">
          <section className="bg-brand px-5 py-8 text-cream sm:px-8 sm:py-12 lg:w-[44%] lg:shrink-0 lg:rounded-none lg:py-14">
            <h1 className="font-display text-2xl font-semibold min-[400px]:text-3xl sm:text-4xl">
              Get in touch
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-cream/85 sm:text-base">
              We&apos;d love to hear from you. Reach out with questions,
              feedback, or support — our team is here to help.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/10">
                  <EnvelopeIcon className="h-5 w-5 text-cream" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cream/60">
                    Email
                  </p>
                  <a
                    href="mailto:hello@heraura.com"
                    className="mt-0.5 block text-sm font-medium text-cream transition-colors hover:text-accent"
                  >
                    hello@heraura.com
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/10">
                  <PhoneIcon className="h-5 w-5 text-cream" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cream/60">
                    Phone
                  </p>
                  <a
                    href="tel:+13235550142"
                    className="mt-0.5 block text-sm font-medium text-cream transition-colors hover:text-accent"
                  >
                    +1 (323) 555-0142
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/10">
                  <MapPinIcon className="h-5 w-5 text-cream" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-cream/60">
                    Address
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-cream/90">
                    1248 Melrose Ave, Suite 200
                    <br />
                    Los Angeles, CA 90046
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-cream/20 bg-brand-hover/40">
              <iframe
                title="HER AURA location"
                src={MAP_EMBED_SRC}
                className="h-40 w-full border-0 sm:h-44"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>

          <section className="border-t border-cream-dark/20 bg-cream px-6 py-10 sm:px-8 sm:py-12 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:py-14">
            <h2 className="font-display text-2xl font-semibold text-brand sm:text-3xl">
              Send us a message
            </h2>
            <p className="mt-3 text-sm text-brand-muted sm:text-base">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-brand"
                >
                  Full name{' '}
                  <span className="text-sale" aria-hidden>
                    *
                  </span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-xl border border-cream-dark/60 bg-page px-4 py-3 text-sm text-brand outline-none transition-shadow placeholder:text-brand-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-brand"
                >
                  Email address{' '}
                  <span className="text-sale" aria-hidden>
                    *
                  </span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-2 w-full rounded-xl border border-cream-dark/60 bg-page px-4 py-3 text-sm text-brand outline-none transition-shadow placeholder:text-brand-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-brand"
                >
                  Message{' '}
                  <span className="text-sale" aria-hidden>
                    *
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please leave your message here."
                  className="mt-2 w-full resize-y rounded-xl border border-cream-dark/60 bg-page px-4 py-3 text-sm text-brand outline-none transition-shadow placeholder:text-brand-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25"
                />
              </div>

              {sent && (
                <p
                  className="text-sm font-medium text-brand-muted"
                  role="status"
                >
                  Thank you — this is a demo, so no message was sent. Connect
                  us to a backend to deliver mail for real.
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold tracking-wide text-brand shadow-md transition-colors hover:bg-accent-hover"
              >
                <EnvelopeSolid className="h-5 w-5 text-cream" />
                Send message
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
