import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import { formatTimeMs } from '../../utils/game.js'

export default function CompletePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const summary = location.state?.summary || null

  return (
    <section
      aria-label="Complete"
      className="relative h-[700px] w-[1400px] rounded-2xl overflow-hidden bg-[url('/homepage.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/30 to-black/20" aria-hidden="true" />

      <div className="relative z-10 h-full">
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center text-white/95">
            <div className="text-[44px] font-black tracking-[0.6px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
              EXCELLENT!
            </div>
            <div className="mt-2 text-[28px] italic font-semibold text-white/90">
              Bạn đã hoàn thành trong thời gian:
            </div>

            <div className="mt-5 inline-flex items-center justify-center h-[54px] px-10 rounded-[10px] bg-white/90 text-black/80 border border-black/10 shadow-[0_18px_30px_rgba(0,0,0,0.18)] text-[24px] font-extrabold">
              {formatTimeMs(summary?.timeMs)}
            </div>

            {summary?.badge?.imgSrc ? (
              <div className="mt-3 grid place-items-center">
                <img
                  src={summary.badge.imgSrc}
                  alt={summary.badge.title || 'New badge'}
                  className="w-[110px] h-[110px] object-contain"
                  draggable="false"
                />
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 place-items-center">
              <Button onClick={() => navigate('/leaderboard')} className="w-[320px] justify-center">
                Đi đến BXH
              </Button>
              <Button onClick={() => navigate('/badges')} className="w-[320px] justify-center">
                Kho huy hiệu
              </Button>
              <Button onClick={() => navigate(`/play/${summary?.topicId || 'greetings'}`)} className="w-[320px] justify-center">
                Chơi lại
              </Button>
            </div>
          </div>
        </div>

        <div
          className="absolute right-[18px] bottom-4 inline-flex items-center gap-2.5 text-white/95"
          aria-label="Footer navigation"
        >
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
        </div>
      </div>
    </section>
  )
}

