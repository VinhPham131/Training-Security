const KEY = 'seceng:v1'

const defaultState = {
  player: { name: '', createdAt: Date.now() },
  stats: {
    level: 1,
    xp: 0,
    totalTimeMs: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    completedTopics: [],
  },
  topicProgress: {},
  badgesUnlocked: {},
  leaderboardsByTopic: {},
}

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function loadState() {
  const raw = localStorage.getItem(KEY)
  const parsed = raw ? safeParse(raw) : null
  if (!parsed) return structuredClone(defaultState)
  return {
    ...structuredClone(defaultState),
    ...parsed,
    player: { ...defaultState.player, ...(parsed.player || {}) },
    stats: { ...defaultState.stats, ...(parsed.stats || {}) },
    topicProgress: { ...(parsed.topicProgress || {}) },
    badgesUnlocked: { ...(parsed.badgesUnlocked || {}) },
  }
}

export function saveState(next) {
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function updateState(mutator) {
  const s = loadState()
  const next = mutator(structuredClone(s)) || s
  saveState(next)
  return next
}

export function resetState() {
  saveState(structuredClone(defaultState))
  return loadState()
}

