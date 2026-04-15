// localStorage persistence layer for Coming Home devotional companion
// All keys are prefixed with "coming-home-" to avoid collisions.

const KEYS = {
  sessions: 'coming-home-sit-sessions',
  coach: 'coming-home-coach-sessions',
  states: 'coming-home-state-checkins',
  apiKey: 'coming-home-api-key',
};

function generateId() {
  const random = Math.random().toString(36).substring(2, 6);
  return Date.now().toString(36) + random;
}

function safeGet(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------------------------------------------------------------------------
// Meditation sessions
// ---------------------------------------------------------------------------

export function saveSitSession(duration, type = 'zazen') {
  const sessions = safeGet(KEYS.sessions);
  sessions.push({ date: new Date().toISOString(), duration, type });
  safeSet(KEYS.sessions, sessions);
}

export function getSitSessions() {
  return safeGet(KEYS.sessions);
}

export function getRecentSessions(days = 7) {
  const cutoff = Date.now() - days * 86_400_000;
  return getSitSessions().filter((s) => new Date(s.date).getTime() >= cutoff);
}

// ---------------------------------------------------------------------------
// Coach conversations
// ---------------------------------------------------------------------------

export function saveCoachSession(session) {
  const sessions = safeGet(KEYS.coach);
  const existing = sessions.findIndex((s) => s.id === session.id);
  if (existing !== -1) {
    sessions[existing] = session;
  } else {
    if (!session.id) session.id = generateId();
    if (!session.date) session.date = new Date().toISOString();
    if (!session.messages) session.messages = [];
    if (!session.themes) session.themes = [];
    sessions.push(session);
  }
  safeSet(KEYS.coach, sessions);
  return session;
}

export function getCoachSessions() {
  return safeGet(KEYS.coach);
}

export function getCoachSession(id) {
  const sessions = safeGet(KEYS.coach);
  return sessions.find((s) => s.id === id) || null;
}

// ---------------------------------------------------------------------------
// State check-ins
// ---------------------------------------------------------------------------

export function saveStateCheckIn(stateId) {
  const checkins = safeGet(KEYS.states);
  checkins.push({ date: new Date().toISOString(), stateId });
  safeSet(KEYS.states, checkins);
}

export function getTodayState() {
  const checkins = safeGet(KEYS.states);
  const today = new Date().toISOString().slice(0, 10);
  const todayCheckins = checkins.filter((c) => c.date.slice(0, 10) === today);
  return todayCheckins.length ? todayCheckins[todayCheckins.length - 1] : null;
}

export function getRecentStates(days = 7) {
  const cutoff = Date.now() - days * 86_400_000;
  return safeGet(KEYS.states).filter(
    (c) => new Date(c.date).getTime() >= cutoff
  );
}

// ---------------------------------------------------------------------------
// API key
// ---------------------------------------------------------------------------

export function saveApiKey(key) {
  localStorage.setItem(KEYS.apiKey, key);
}

export function getApiKey() {
  try {
    return localStorage.getItem(KEYS.apiKey) || null;
  } catch {
    return null;
  }
}

export function clearApiKey() {
  localStorage.removeItem(KEYS.apiKey);
}
