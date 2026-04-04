import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'ghost' | 'hero' | 'heroGhost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base =
  'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'rounded-full bg-brand px-6 text-cream shadow-md shadow-brand/20 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98]',
  outline:
    'rounded-full border border-brand/25 bg-cream px-6 text-brand hover:border-accent hover:text-accent',
  ghost:
    'rounded-lg px-3 text-brand-muted hover:bg-cream-muted hover:text-brand',
  hero:
    'rounded-full border border-cream/30 bg-cream/95 px-6 text-brand shadow-md hover:border-accent hover:bg-cream hover:shadow-lg active:scale-[0.98]',
  heroGhost:
    'rounded-full border-2 border-cream/70 bg-transparent px-6 text-cream hover:border-cream hover:bg-cream/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 min-w-[2.25rem] text-sm',
  md: 'h-11 min-w-[2.75rem] text-[0.9375rem]',
  lg: 'h-12 min-w-[3rem] text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className = '', variant = 'primary', size = 'md', type = 'button', ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  },
)

export type ButtonLinkProps = Omit<LinkProps, 'className'> &
  Pick<ButtonProps, 'variant' | 'size' | 'className' | 'children'>

export function ButtonLink({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
