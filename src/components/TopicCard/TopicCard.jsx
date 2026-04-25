import Button from '../Button/Button.jsx'

export default function TopicCard({ title, subtitle, onPlay, artSrc, span }) {
  return (
    <article className="min-h-[260px] grid grid-rows-[auto,auto,1fr] overflow-hidden rounded-[18px] border border-white/15 bg-linear-to-b from-[rgba(168,59,20,0.86)] to-[rgba(120,36,12,0.92)] shadow-[0_18px_32px_rgba(0,0,0,0.33)]">
      <header className="px-3.5 pt-3.5 pb-2">
        <h3 className="m-0 text-[16px] font-black tracking-[0.3px] text-white/95 flex items-center gap-2">
          <span aria-hidden="true">{span}</span>
          {title}
        </h3>
        <div className="mt-1.5 text-[12px] leading-[1.35] text-white/80">{subtitle}</div>
      </header>

      <div className="px-3.5 pt-3 pb-3.5 grid grid-rows-[1fr,auto] gap-2.5">
        <div className="relative rounded-[14px] bg-black/10 border border-white/10 overflow-hidden grid place-items-end">
          <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" aria-hidden="true" />
          {artSrc ? (
            <img
              src={artSrc}
              alt=""
              className="relative h-[220px] w-auto object-contain opacity-95 translate-y-[6px]"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
        <Button className="w-full justify-center bg-black/15 border border-white/15 shadow-none hover:shadow-none" size="sm" onClick={onPlay}>
          Nhấn để chọn
        </Button>
      </div>
    </article>
  )
}

