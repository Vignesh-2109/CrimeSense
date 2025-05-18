import clsx from 'clsx'
import Link from 'next/link'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-md py-2 px-4 text-sm focus:outline-none',
}

// Adding new styles for Hover-fill, Hover-black, and Hover-3 variants
const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    primary:
      'bg-primary-600 text-white hover:text-slate-100 hover:bg-primary-500 active:bg-primary-800 active:text-primary-100 focus-visible:outline-primary-600',
    white:
      'bg-white text-slate-900 hover:bg-primary-50 active:bg-primary-200 active:text-slate-600 focus-visible:outline-white',
    // Hover-fill variant
    hoverFill:
      'text-primary-700 bg-transparent border border-primary-700 hover:bg-primary-700 hover:text-white active:bg-primary-800 focus-visible:outline-primary-700',
    // Hover-black variant
    hoverBlack:
      'bg-white text-black border border-black hover:bg-black hover:text-white focus-visible:outline-black',
    // Hover-3 variant with arrow
    hoverArrow:
      'text-primary-700 bg-transparent hover:pr-6 hover:text-primary-700 relative transition-all after:content-["→"] after:absolute after:right-3 after:opacity-0 hover:after:opacity-100 hover:after:right-1',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-primary-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
    primary:
      'ring-primary-400 text-primary-700 hover:text-white hover:ring-primary-300 hover:bg-primary-500 active:bg-primary-100 active:text-primary-600 focus-visible:outline-primary-600 focus-visible:ring-primary-300',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'slate'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
