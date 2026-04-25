export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex w-full select-none items-center justify-center gap-2 rounded-[14px] border border-transparent px-[18px] font-black tracking-[0.4px] transition-transform duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-55 disabled:saturate-50 hover:-translate-y-[1px]'

  const sizes = {
    md: 'h-[52px] text-[18px]',
    sm: 'h-[44px] rounded-[12px] text-[15px]',
  }

  const variants = {
    primary:
      'bg-gradient-to-b from-[#b5481a] to-[#8a2d11] text-white/95 shadow-[0_18px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_22px_36px_rgba(0,0,0,0.42)]',
    ghost:
      'border-white/15 bg-black/15 text-white/90 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]',
  }

  const cls = [base, sizes[size] || sizes.md, variants[variant] || variants.primary, className]
    .filter(Boolean)
    .join(' ')
  return (
    <button {...props} className={cls}>
      {children}
    </button>
  )
}

