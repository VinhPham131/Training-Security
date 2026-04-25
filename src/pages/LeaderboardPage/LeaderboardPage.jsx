import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadState } from '../../utils/storage.js'
import { TOPICS } from '../../data/topics.js'
import { formatTimeMs } from '../../utils/game.js'

export default function LeaderboardPage() {
  const navigate = useNavigate()
  const s = useMemo(() => loadState(), [])
  const [topicId, setTopicId] = useState(TOPICS[0]?.id || '')
  const rows = (s.leaderboardsByTopic?.[topicId] || []).filter(Boolean)
  const topicTitle = TOPICS.find((t) => t.id === topicId)?.title || 'Chủ đề'
  const me = s.player?.name || ''
  const myIdx = me ? rows.findIndex((r) => r.name === me) : -1
  const myTimeMs = myIdx >= 0 ? rows[myIdx]?.timeMs : null

  return (
    <section aria-label="Leaderboard" className="relative h-full">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center h-[38px] px-4 rounded-full bg-white/10 border border-white/15 font-black text-white/95 tracking-[0.6px] uppercase text-[13px]">
            BẢNG XẾP HẠNG
          </div>
          <div className="mt-2 text-white/75 text-[13px]">
            Xếp theo <span className="font-extrabold text-white/90">thời gian</span> (càng nhanh càng tốt)
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-white/70 uppercase tracking-[0.6px]">Player</div>
          <div className="font-black text-white/90">{s.player?.name || 'Player'}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-[12px] uppercase tracking-[0.6px] text-white/70">Chủ đề</div>
        <select
          className="h-10 rounded-[14px] px-3 bg-black/20 border border-white/20 text-white/90 outline-none"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          aria-label="Topic filter"
        >
          {TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <div className="ml-auto text-[12px] text-white/65">
          Đang xem: <span className="text-white/85 font-extrabold">{topicTitle}</span>
        </div>
      </div>

      <div className="mt-3.5 rounded-[18px] overflow-hidden border border-white/15 bg-black/15">
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr className="bg-[rgba(168,59,20,0.22)]">
              <th className="px-3 py-3 text-[12px] uppercase tracking-[0.6px] text-white/75 text-left">#</th>
              <th className="px-3 py-3 text-[12px] uppercase tracking-[0.6px] text-white/75 text-left">
                Tên
              </th>
              <th className="px-3 py-3 text-[12px] uppercase tracking-[0.6px] text-white/75 text-left">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const isMe = r.name === (s.player?.name || '')
              return (
                <tr
                  key={`${r.name}-${r.timeMs}`}
                  className={[
                    'border-b border-white/10 hover:bg-white/5',
                    isMe ? 'bg-[rgba(242,209,161,0.10)] hover:bg-[rgba(242,209,161,0.14)]' : '',
                  ].join(' ')}
                >
                  <td className="px-3 py-3 text-white/85">{idx + 1}</td>
                  <td className="px-3 py-3 text-white/85">{r.name}</td>
                  <td className="px-3 py-3 text-white/85">{formatTimeMs(r.timeMs)}</td>
                </tr>
              )
            })}
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-white/70" colSpan={3}>
                  Chưa có dữ liệu cho chủ đề này. Hãy chơi xong một lượt để lên bảng xếp hạng.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {rows.length ? (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-[18px] bg-white/8 border border-white/12 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.6px] text-white/65">Hạng của bạn</div>
            <div className="mt-1 text-[18px] font-black text-white/90">
              {myIdx >= 0 ? myIdx + 1 : '—'}
            </div>
          </div>
          <div className="rounded-[18px] bg-white/8 border border-white/12 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.6px] text-white/65">Best time</div>
            <div className="mt-1 text-[18px] font-black text-white/90">
              {typeof myTimeMs === 'number' ? formatTimeMs(myTimeMs) : '—'}
            </div>
          </div>
          <div className="rounded-[18px] bg-white/8 border border-white/12 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.6px] text-white/65">Top 1</div>
            <div className="mt-1 text-[18px] font-black text-white/90">{rows[0] ? formatTimeMs(rows[0].timeMs) : '—'}</div>
          </div>
        </div>
      ) : null}

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
      </div>
    </section>
  )
}

