import { BADGES } from '../data/badges.js'
import { loadState, updateState } from './storage.js'

export function formatTimeMs(ms) {
  const total = Math.max(0, Math.floor(ms || 0))
  const m = Math.floor(total / 60000)
  const s = Math.floor((total % 60000) / 1000)
  const cs = Math.floor((total % 1000) / 10)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`
}

export function levelFromXp(xp) {
  // light, fast progression: level n requires n^2 * 250 xp
  let level = 1
  while (xp >= (level + 1) * (level + 1) * 250) level++
  return level
}

export function submitRun({ topicId, run }) {
  // run: { answered, correct, accuracyPct, completed, timeMs }
  const before = loadState()
  const beforeUnlocked = before.badgesUnlocked || {}
  let awardedBadgeId = null

  const pickAwardBadgeId = (s) => {
    const unlocked = s.badgesUnlocked || {}
    const locked = BADGES.map((b) => b.id).filter((id) => !unlocked[id])
    const pool = locked.length ? locked : BADGES.map((b) => b.id)
    return pool[Math.floor(Math.random() * pool.length)] || null
  }

  const nextState = updateState((s) => {
    s.stats.totalAnswered += run.answered
    s.stats.totalCorrect += run.correct
    if (run.completed && Number.isFinite(run.timeMs) && run.timeMs > 0) {
      s.stats.totalTimeMs = (s.stats.totalTimeMs || 0) + Math.round(run.timeMs)
    }

    // lightweight XP: reward completion; faster time gives slightly more
    if (run.completed && Number.isFinite(run.timeMs) && run.timeMs > 0) {
      const t = Math.max(1, Math.round(run.timeMs))
      const speedBonus = Math.min(120, Math.floor(90000 / t) * 20) // ~0..120
      s.stats.xp += 80 + speedBonus
    }
    s.stats.level = levelFromXp(s.stats.xp)

    const prev = s.topicProgress[topicId] || {
      bestTimeMs: null,
      bestAccuracy: 0,
      plays: 0,
      completed: false,
    }
    const bestTimeMs =
      run.completed && Number.isFinite(run.timeMs) && run.timeMs > 0
        ? typeof prev.bestTimeMs !== 'number'
          ? Math.round(run.timeMs)
          : Math.min(prev.bestTimeMs, Math.round(run.timeMs))
        : prev.bestTimeMs
    s.topicProgress[topicId] = {
      ...prev,
      plays: prev.plays + 1,
      bestTimeMs,
      bestAccuracy: Math.max(prev.bestAccuracy, run.accuracyPct),
      completed: prev.completed || run.completed,
    }

    if (run.completed && !s.stats.completedTopics.includes(topicId)) {
      s.stats.completedTopics = [...s.stats.completedTopics, topicId]
    }

    // leaderboard per-topic (real local results, no seeded/fake data)
    // Store EVERY completed run (so retries are kept).
    if (run.completed && Number.isFinite(run.timeMs) && run.timeMs > 0) {
      const me = s.player?.name?.trim() || 'Player'
      const entry = { name: me, timeMs: Math.round(run.timeMs), createdAt: Date.now() }

      const byTopic = { ...(s.leaderboardsByTopic || {}) }
      const list = [...(byTopic[topicId] || [])]
      list.push(entry)
      list.sort((a, b) => a.timeMs - b.timeMs)
      byTopic[topicId] = list.slice(0, 30)
      s.leaderboardsByTopic = byTopic
    }

    // badges
    const unlock = (id) => {
      if (!s.badgesUnlocked) s.badgesUnlocked = {}
      s.badgesUnlocked[id] = true
    }

    // Award 1 random badge on completion (no conditions).
    if (run.completed) {
      awardedBadgeId = pickAwardBadgeId(s)
      if (awardedBadgeId) unlock(awardedBadgeId)
    }

    // keep badge list future-proof (ensure keys exist)
    for (const b of BADGES) s.badgesUnlocked[b.id] = !!s.badgesUnlocked[b.id]
    return s
  })

  const afterUnlocked = nextState.badgesUnlocked || {}
  const newlyUnlockedBadgeIds = BADGES.map((b) => b.id).filter(
    (id) => !!afterUnlocked[id] && !beforeUnlocked[id],
  )

  return { state: nextState, newlyUnlockedBadgeIds, awardedBadgeId }
}

export function getProgressPct(topicId) {
  const s = loadState()
  const p = s.topicProgress?.[topicId]
  if (!p) return 0
  // time-based progress: faster => higher. target ~ 90s for 100%.
  const targetMs = 90000
  const bestTimeMs = typeof p.bestTimeMs === 'number' ? p.bestTimeMs : null
  const timePct =
    bestTimeMs && bestTimeMs > 0 ? Math.max(0, Math.min(100, Math.round((targetMs / bestTimeMs) * 100))) : 0
  const acc = Math.min(100, Math.round(p.bestAccuracy))
  return Math.round((timePct * 0.6 + acc * 0.4) || 0)
}

