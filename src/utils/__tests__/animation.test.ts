import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  calculateHorseDurations,
  calculateHorseProgress,
  areAllHorsesFinished,
  calculateStartTime,
} from '../animation'
import type { Horse, HorseDuration } from '../types'

describe('calculateHorseDurations', () => {
  const mockHorses: Horse[] = [
    { id: 'horse-1', name: 'Thunder', color: '#FF6B6B', conditionScore: 100 },
    { id: 'horse-2', name: 'Lightning', color: '#4ECDC4', conditionScore: 50 },
  ]

  it('should calculate durations for all horses', () => {
    const durations = calculateHorseDurations(mockHorses, 4000)
    expect(durations).toHaveLength(2)
    durations.forEach((duration) => {
      expect(duration.duration).toBeGreaterThan(0)
    })
  })
})

describe('calculateHorseProgress', () => {
  const mockHorseDurations: HorseDuration[] = [
    {
      horse: { id: 'horse-1', name: 'Thunder', color: '#FF6B6B', conditionScore: 100 },
      duration: 4000,
    },
  ]

  it('should calculate progress correctly', () => {
    expect(calculateHorseProgress(mockHorseDurations, 0)['horse-1']).toBe(0)
    expect(calculateHorseProgress(mockHorseDurations, 2000)['horse-1']).toBe(0.5)
    expect(calculateHorseProgress(mockHorseDurations, 4000)['horse-1']).toBe(1)
    expect(calculateHorseProgress(mockHorseDurations, 10000)['horse-1']).toBe(1)
  })
})

describe('areAllHorsesFinished', () => {
  it('should return true when all horses finished', () => {
    expect(areAllHorsesFinished({ 'horse-1': 1, 'horse-2': 1 })).toBe(true)
  })

  it('should return false when any horse not finished', () => {
    expect(areAllHorsesFinished({ 'horse-1': 1, 'horse-2': 0.8 })).toBe(false)
  })
})

describe('calculateStartTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return provided start time', () => {
    expect(calculateStartTime(1000, 0)).toBe(1000)
  })

  it('should calculate from paused elapsed time', () => {
    const now = Date.now()
    vi.setSystemTime(now)
    expect(calculateStartTime(null, 5000)).toBe(now - 5000)
  })
})
