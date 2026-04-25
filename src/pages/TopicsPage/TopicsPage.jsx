import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import TopicCard from '../../components/TopicCard/TopicCard.jsx'
import { TOPICS } from '../../data/topics.js'
import { getProgressPct } from '../../utils/game.js'

export default function TopicsPage() {
  const navigate = useNavigate()
  const baseUrl = import.meta.env.BASE_URL || '/'
  const items = useMemo(
    () =>
      TOPICS.map((t) => ({
        ...t,
        progressPct: getProgressPct(t.id),
        artSrc:
          t.id === 'greetings'
            ? `${baseUrl}normal.png`
            : t.id === 'visitor-checkin'
              ? `${baseUrl}happy.png`
              : t.id === 'emergency'
                ? `${baseUrl}angry.png`
                : `${baseUrl}normal.png`,
      })),
    [baseUrl],
  )

  return (
    <section
      aria-label="Topics"
      className="relative h-[700px] w-[1400px] mx-auto rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${baseUrl}homepage.png')` }}
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-black/65 via-black/35 to-black/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(900px_520px_at_40%_30%,rgba(168,59,20,0.35),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full p-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center h-[38px] px-4 rounded-full bg-white/10 border border-white/15 font-black text-white/95 tracking-[0.6px] uppercase text-[13px]">
            CHỦ ĐỀ
          </div>
        </div>

        <div className="h-4" />

        <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-[22px] items-start">
          <div className="text-white/80 text-[16px] leading-normal">
            Chọn một tình huống để bắt đầu luyện tập giao tiếp tiếng Anh. Thời
            gian được ghi nhận để xếp hạng, vì vậy hãy cố gắng hoàn thành tốt
            trong thời gian sớm nhất nhé!
          </div>

          <div className="rounded-[22px] p-4 bg-[rgba(168,59,20,0.30)] border border-white/15 shadow-[0_18px_30px_rgba(0,0,0,0.22)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 p-4">
              {items.slice(0, 3).map((t) => (
                <TopicCard
                  key={t.id}
                  title={t.title}
                  subtitle={t.subtitle}
                  artSrc={t.artSrc}
                  onPlay={() => navigate(`/play/${t.id}`)}
                  span={t.span}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute left-[18px] bottom-4 inline-flex items-center gap-2.5 text-white/95"
          aria-label="Back navigation"
        >
          <button
            type="button"
            className="w-[46px] h-[46px] rounded-[14px] bg-white/10 border border-white/20 grid place-items-center transition hover:-translate-y-px hover:bg-white/15"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
  );
}

