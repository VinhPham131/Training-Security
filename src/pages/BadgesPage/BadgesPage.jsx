import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BADGES } from '../../data/badges.js'
import { loadState } from '../../utils/storage.js'

export default function BadgesPage() {
  const navigate = useNavigate()
  const s = useMemo(() => loadState(), [])
  const unlocked = s.badgesUnlocked || {}

  return (
    <section
      aria-label="Badges"
      className="relative h-[700px] w-[1400px] mx-auto rounded-2xl overflow-hidden bg-[url('/homepage.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/32 to-black/25" aria-hidden="true" />

      <div className="relative z-10 h-full p-6">
        <div className="w-full flex justify-center">
          <div className="inline-flex items-center h-[46px] px-7 rounded-full bg-white/90 text-[#7a3b1c] border border-black/10 shadow-[0_18px_30px_rgba(0,0,0,0.18)] font-black tracking-[0.8px] uppercase text-[18px]">
            HUY HIỆU &amp; THÀNH TÍCH
          </div>
        </div>

        <div className="h-10" />

        <div className="max-w-[1050px] mx-auto">
          <div className="grid grid-cols-5 gap-x-12 gap-y-12 place-items-center">
            {BADGES.slice(0, 10).map((b) => {
              const on = !!unlocked[b.id] && !!b.imgSrc
              return (
                <div
                  key={b.id}
                  className="w-[170px] h-[130px] rounded-[22px] bg-white/90 shadow-[0_18px_30px_rgba(0,0,0,0.18)] grid place-items-center"
                >
                  {on ? (
                    <img
                      src={b.imgSrc}
                      alt={b.title || 'Badge'}
                      className="w-[92px] h-[92px] object-contain"
                      draggable="false"
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute left-[18px] bottom-4 inline-flex items-center gap-2.5 text-white/95" aria-label="Back navigation">
          <button
            type="button"
            className="w-[46px] h-[46px] rounded-[14px] bg-white/10 border border-white/20 grid place-items-center transition hover:-translate-y-px hover:bg-white/15"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15.5 19 8.5 12l7-7"
                stroke="rgba(255,255,255,.92)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

      <div className="absolute right-[18px] bottom-4 inline-flex items-center gap-2.5 text-white/95" aria-label="Footer navigation">
        <button
          type="button"
          className="w-[46px] h-[46px] rounded-[14px] bg-white/10 border border-white/20 grid place-items-center transition hover:-translate-y-px hover:bg-white/15"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z"
              stroke="rgba(255,255,255,.92)"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="font-extrabold tracking-[0.2px]">Home</span>
      </div>
      </div>
    </section>
  )
}

