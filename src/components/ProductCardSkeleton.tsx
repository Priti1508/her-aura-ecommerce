type Props = { variant?: 'default' | 'listing' }

export function ProductCardSkeleton({ variant = 'default' }: Props) {
  const aspect =
    variant === 'listing' ? 'aspect-[3/4]' : 'aspect-square'

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-dark/40 bg-cream shadow-sm">
      <div
        className={`animate-pulse bg-gradient-to-br from-cream-muted to-cream-dark ${aspect}`}
      />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="h-3 w-16 animate-pulse rounded bg-cream-dark/80" />
        <div className="h-6 w-4/5 animate-pulse rounded-md bg-cream-dark" />
        <div className="h-5 w-24 animate-pulse rounded-md bg-cream-muted" />
        <div className="h-6 w-32 animate-pulse rounded-md bg-cream-dark" />
      </div>
    </div>
  )
}
