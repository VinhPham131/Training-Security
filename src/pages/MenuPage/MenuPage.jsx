import { loadState, updateState } from '../../utils/storage.js'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'

export default function MenuPage() {
  const navigate = useNavigate()
  const initial = useMemo(() => loadState(), [])
  const [name, setName] = useState(initial.player?.name || '')

  const saveName = (nextName) => {
    const n = nextName.trim().slice(0, 24)
    setName(n)
    updateState((s) => {
      s.player.name = n
      return s
    })
  }

  const go = (path) => {
    if (!name.trim()) saveName('Player')
    navigate(path)
  }
  return (
    <section
      aria-label="Main menu"
      className="relative h-[700px] w-[1400px] mx-auto rounded-2xl overflow-hidden bg-[url('/homepage.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(820px_520px_at_38%_32%,rgba(168,59,20,0.40),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full p-6">
        <div className="h-full grid place-items-center">
          <div className="w-full max-w-[560px]">
            <div className="w-full flex justify-center">
              <div className="inline-flex items-center h-[46px] px-7 rounded-full bg-white/90 text-[#7a3b1c] border border-black/10 shadow-[0_18px_30px_rgba(0,0,0,0.18)] font-black tracking-[0.8px] uppercase text-[18px]">
                MENU
              </div>
            </div>

            <div className="h-6" />

            <input
              className="w-full h-12 rounded-[16px] px-4 border border-white/20 bg-black/25 text-white/95 outline-none transition-[border-color,box-shadow] duration-150 focus:border-white/35 focus:shadow-[0_0_0_4px_rgba(168,59,20,0.22)]"
              value={name}
              placeholder="Nhập tên của bạn"
              onChange={(e) => setName(e.target.value)}
              onBlur={() => saveName(name)}
              aria-label="Player name"
            />

            <div className="h-4" />

            <div className="grid gap-3">
              <Button className="h-14 rounded-[14px] tracking-[0.5px]" onClick={() => go('/topics')}>
                Chủ đề
              </Button>
              <Button className="h-14 rounded-[14px] tracking-[0.5px]" onClick={() => go('/rules')}>
                Luật chơi
              </Button>
              <Button className="h-14 rounded-[14px] tracking-[0.5px]" onClick={() => go('/leaderboard')}>
                Bảng xếp hạng
              </Button>
              <Button className="h-14 rounded-[14px] tracking-[0.5px]" onClick={() => go('/badges')}>
                Kho huy hiệu
              </Button>
            </div>
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
