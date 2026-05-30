'use client'

export interface UserProgress {
  completedLessons: string[]   // lessonId
  completedTopics: string[]    // topicId
  solvedProblems: string[]     // problemId
  quizScores: Record<string, number>  // quizId -> score
  streak: number
  lastStudyDate: string
  totalStudyMinutes: number
  xp: number
  level: number
  heroName: string             // nama hero (putri pengguna)
}

const STORAGE_KEY = 'ag-osn-progress'

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress()
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultProgress()
  try {
    return { ...defaultProgress(), ...JSON.parse(raw) }
  } catch {
    return defaultProgress()
  }
}

// Nama hero dikunci ke AIESHA
export const HERO_NAME = 'AIESHA'

function defaultProgress(): UserProgress {
  return {
    completedLessons: [],
    completedTopics: [],
    solvedProblems: [],
    quizScores: {},
    streak: 0,
    lastStudyDate: '',
    totalStudyMinutes: 0,
    xp: 0,
    level: 1,
    heroName: HERO_NAME,
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  // Dispatch event agar komponen lain (Sidebar) bisa refresh
  window.dispatchEvent(new CustomEvent('ag-progress-update', { detail: progress }))
}

export function markLessonComplete(lessonId: string): void {
  const p = getProgress()
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId)
    p.xp += 50
    p.level = Math.floor(p.xp / 500) + 1
    updateStreak(p)
    saveProgress(p)
  }
}

export function markProblemSolved(problemId: string, points: number): void {
  const p = getProgress()
  if (!p.solvedProblems.includes(problemId)) {
    p.solvedProblems.push(problemId)
    p.xp += points
    p.level = Math.floor(p.xp / 500) + 1
    updateStreak(p)
    saveProgress(p)
  }
}

export function saveQuizScore(quizSessionId: string, score: number): void {
  const p = getProgress()
  p.quizScores[quizSessionId] = Math.max(p.quizScores[quizSessionId] || 0, score)
  p.xp += Math.floor(score * 10)
  p.level = Math.floor(p.xp / 500) + 1
  updateStreak(p)
  saveProgress(p)
}

function updateStreak(p: UserProgress): void {
  const today = new Date().toISOString().split('T')[0]
  if (p.lastStudyDate === today) return
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (p.lastStudyDate === yesterday) {
    p.streak++
  } else if (p.lastStudyDate !== today) {
    p.streak = 1
  }
  p.lastStudyDate = today
}

export function getLevelName(level: number): string {
  const levels = [
    'Pemula', 'Pelajar', 'Mahir', 'Ahli', 'Master',
    'Grandmaster', 'Legend', 'OSN Kota', 'OSN Provinsi', 'OSN Nasional',
  ]
  return levels[Math.min(level - 1, levels.length - 1)]
}

export function getXPForNextLevel(level: number): number {
  return level * 500
}
