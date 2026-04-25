import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import { TOPICS } from '../../data/topics.js'
import { getQuestionsForTopic } from '../../data/questions.js'
import { submitRun } from '../../utils/game.js'
import { BADGES } from '../../data/badges.js'

const DEFAULT_TIMER_MS = 12000

export default function TopicPlayPage() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = TOPICS.find((t) => t.id === topicId)
  const questions = useMemo(() => getQuestionsForTopic(topicId), [topicId])
  const runStartRef = useRef(0)

  const [idx, setIdx] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [locked, setLocked] = useState(false)
  const [phase, setPhase] = useState('playing') // playing | wrong | complete
  const [completeSummary, setCompleteSummary] = useState(null)
  const [matchPick, setMatchPick] = useState({ left: null, matches: {} })
  const lockedRef = useRef(false)
  const answerRef = useRef(null)
  useEffect(() => {
    lockedRef.current = locked
  }, [locked])

  useEffect(() => {
    runStartRef.current = Date.now()
  }, [topicId])

  const q = questions[idx]
  const timed = !!q?.timed
  const [msRemaining, setMsRemaining] = useState(DEFAULT_TIMER_MS)
  const tickRef = useRef(null)

  const accuracyPct = answered ? Math.round((correct / answered) * 100) : 0
  const progressPct = Math.round(((idx + 1) / Math.max(1, questions.length)) * 100)

  useEffect(() => {
    if (!timed) return
    if (phase !== 'playing') return
    const started = Date.now()
    tickRef.current = window.setInterval(() => {
      const left = Math.max(0, DEFAULT_TIMER_MS - (Date.now() - started))
      setMsRemaining(left)
      if (left === 0) {
        window.clearInterval(tickRef.current)
        if (!lockedRef.current) answerRef.current?.(null)
      }
    }, 80)
    return () => window.clearInterval(tickRef.current)
  }, [idx, timed, phase])

  const next = () => {
    setFeedback(null)
    setLocked(false)
    setPhase('playing')
    setMatchPick({ left: null, matches: {} })
    setMsRemaining(DEFAULT_TIMER_MS)
    if (idx + 1 >= questions.length) {
      const timeMs = Date.now() - runStartRef.current
      const run = {
        answered,
        correct,
        accuracyPct,
        completed: true,
        timeMs,
      }
      const res = submitRun({ topicId, run })
      const badge = res?.awardedBadgeId ? BADGES.find((b) => b.id === res.awardedBadgeId) : null
      setCompleteSummary({
        timeMs,
        badge,
        newBadgeCount: (res?.newlyUnlockedBadgeIds || []).filter((id) => id.startsWith('badge-')).length,
      })
      setPhase('complete')
      return
    }
    setIdx((x) => x + 1)
  }

  function answer(value) {
    if (locked) return
    setLocked(true)

    const isCorrect =
      q.type === 'match'
        ? value === true
        : typeof value === 'string'
          ? value === q.answer
          : false

    setAnswered((x) => x + 1)
    if (isCorrect) {
      setCorrect((x) => x + 1)
    }

    setFeedback({
      ok: isCorrect,
      answer: q.answer,
    })

    if (!isCorrect) {
      setPhase('wrong')
      return
    }

    window.setTimeout(next, 650)
  }

  useEffect(() => {
    answerRef.current = answer
  })

  const pickLeft = (left) => {
    if (locked) return
    setMatchPick((s) => {
      if (s.matches[left]) return s
      return { ...s, left }
    })
  }

  const pickRight = (right) => {
    if (locked) return
    if (!matchPick.left) return
    const left = matchPick.left
    const nextMatches = { ...matchPick.matches, [left]: right }
    setMatchPick({ left: null, matches: nextMatches })
    if (q?.type !== 'match') return
    if (Object.keys(nextMatches).length !== q.pairs.length) return
    const ok = q.pairs.every((p) => nextMatches[p.left] === p.right)
    answer(ok)
  }

  const topicIndex = Math.max(1, (topic?.level || 1))
  const bgSrc = phase === 'wrong' ? '/angry.png' : phase === 'complete' ? '/happy.png' : '/normal.png'

  const retry = () => {
    // Retry only the current question (do not reset run progress).
    setFeedback(null)
    setLocked(false)
    setPhase('playing')
    setMatchPick({ left: null, matches: {} })
    setMsRemaining(DEFAULT_TIMER_MS)
  }

  return (
    <section
      aria-label="Play topic"
      className="relative h-[700px] w-[1400px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgSrc}')` }}
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-black/55 via-black/30 to-black/20"
        aria-hidden="true"
      />
      {!topic ? (
        <div>Topic not found.</div>
      ) : (
        <div className="relative z-10 h-full p-6">
          {phase === "wrong" ? (
            <div className="h-full grid content-center">
              <div className="max-w-[450px] mt-14 ml-30">
                <div className="relative rounded-[22px] bg-white/92 text-black/85 shadow-[0_18px_30px_rgba(0,0,0,0.28)] px-6 py-4">
                  <div className="font-black tracking-[0.4px] text-[20px] text-[#b5481a]">
                    MR.TOM
                  </div>
                  <div className="mt-1.5 text-[28px] font-semibold leading-[1.35]">
                    I am not satisfied.
                  </div>
                  <div className="mt-1 text-[28px] font-semibold leading-[1.35]">
                    Call your manager right now!!!!
                  </div>

                  <div
                    className="absolute -right-3 top-[44px] w-0 h-0 border-y-14 border-y-transparent border-l-18 border-l-white/92"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-[1000px] mt-100 ">
                <Button onClick={retry} className="w-full justify-center">
                  Thử lại
                </Button>
                <Button
                  onClick={() => navigate("/topics")}
                  className="w-full justify-center"
                >
                  Kết thúc
                </Button>
              </div>
            </div>
          ) : phase === "complete" ? (
            <div className="h-full grid content-center">
              <div className="max-w-[450px] mt-14 ml-30">
                <div className="relative rounded-[22px] bg-white/92 text-black/85 shadow-[0_18px_30px_rgba(0,0,0,0.28)] px-6 py-4">
                  <div className="font-black tracking-[0.4px] text-[20px] text-[#b5481a]">
                    MR.TOM
                  </div>
                  <div className="mt-1.5 text-[28px] font-semibold leading-[1.35]">
                    You too! Have a great day!
                  </div>
                  <div
                    className="absolute -right-3 top-[44px] w-0 h-0 border-y-14 border-y-transparent border-l-18 border-l-white/92"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="ml-auto mt-100 ">
                <Button
                  onClick={() =>
                    navigate('/complete', {
                      state: {
                        summary: { ...completeSummary, topicId },
                      },
                    })
                  }
                  className="w-full justify-center"
                >
                  Hoàn Thành
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center h-[38px] px-4 rounded-full bg-white/10 border border-white/15 font-black text-white/95 tracking-[0.6px] uppercase text-[13px]">
                  Chủ đề {topicIndex}: {topic.title}
                </div>

                <div className="flex items-center gap-2.5">
                  {timed ? (
                    <div className="inline-flex items-center gap-2 font-black text-white/90 bg-black/15 border border-white/15 rounded-full px-3 py-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-[#ffb38a] shadow-[0_0_0_4px_rgba(255,179,138,0.18)]"
                        aria-hidden="true"
                      />
                      {Math.ceil(msRemaining / 1000)}s
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="h-4" />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6 items-end">
                <div>
                  <div className="relative max-w-[620px] rounded-[22px] bg-white/92 text-black/85 shadow-[0_18px_30px_rgba(0,0,0,0.28)] px-6 py-4">
                    <div className="font-black tracking-[0.4px] text-[15px] text-[#b5481a]">
                      MR.TOM
                    </div>
                    <div className="mt-1.5 text-[18px] font-semibold leading-[1.35]">
                      {q.prompt}
                    </div>

                    <div
                      className="absolute -right-3 top-[44px] w-0 h-0 border-y-14 border-y-transparent border-l-18 border-l-white/92"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="h-4" />

                  {q.type === "mcq" ? (
                    <div className="grid gap-3 max-w-[620px]">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => answer(opt)}
                          disabled={locked}
                          className={[
                            "h-[52px] rounded-[14px] px-4 text-left bg-white/85 text-black/80 font-extrabold border border-black/10 shadow-[0_10px_18px_rgba(0,0,0,0.18)] transition disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-px hover:bg-white",
                            feedback?.ok && opt === q.answer
                              ? "ring-2 ring-[#b5481a]/35"
                              : "",
                          ].join(" ")}
                        >
                          <span className="inline-flex items-center justify-between w-full">
                            <span>{opt}</span>
                            <span className="text-black/45" aria-hidden="true">
                              ▶
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {q.type === "fill" ? (
                    <div className="grid gap-3 max-w-[620px]">
                      {q.choices.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => answer(opt)}
                          disabled={locked}
                          className={[
                            "h-[52px] rounded-[14px] px-4 text-left bg-white/85 text-black/80 font-extrabold border border-black/10 shadow-[0_10px_18px_rgba(0,0,0,0.18)] transition disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-px hover:bg-white",
                            feedback?.ok && opt === q.answer
                              ? "ring-2 ring-[#b5481a]/35"
                              : "",
                          ].join(" ")}
                        >
                          <span className="inline-flex items-center justify-between w-full">
                            <span>{opt}</span>
                            <span className="text-black/45" aria-hidden="true">
                              ▶
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {q.type === "match" ? (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[620px]"
                      aria-label="Matching grid"
                    >
                      <div className="grid gap-3">
                        {q.pairs.map((p) => (
                          <button
                            key={p.left}
                            type="button"
                            className={[
                              "h-[52px] rounded-[14px] px-4 text-left bg-white/85 text-black/80 font-extrabold border border-black/10 shadow-[0_10px_18px_rgba(0,0,0,0.18)] transition disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-px hover:bg-white",
                              matchPick.left === p.left
                                ? "ring-2 ring-[#b5481a]/35"
                                : "",
                              matchPick.matches[p.left] ? "opacity-75" : "",
                            ].join(" ")}
                            onClick={() => pickLeft(p.left)}
                            disabled={locked}
                          >
                            {p.left}
                          </button>
                        ))}
                      </div>
                      <div className="grid gap-3">
                        {q.pairs.map((p) => (
                          <button
                            key={p.right}
                            type="button"
                            className="h-[52px] rounded-[14px] px-4 text-left bg-white/85 text-black/80 font-extrabold border border-black/10 shadow-[0_10px_18px_rgba(0,0,0,0.18)] transition disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-px hover:bg-white"
                            onClick={() => pickRight(p.right)}
                            disabled={locked}
                          >
                            {p.right}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="h-3.5" />

                  <div className="flex items-center gap-2.5 max-w-[620px]">
                    <div className="flex-1 h-2.5 rounded-full bg-black/20 border border-white/15 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-[#f2d1a1] to-[#fff2d9]"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <div className="w-[70px] text-right font-black text-white/85">
                      {idx + 1}/{questions.length}
                    </div>
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
            </>
          )}
        </div>
      )}
    </section>
  );
}

