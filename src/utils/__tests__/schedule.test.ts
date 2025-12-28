import { describe, it, expect } from 'vitest'
import { selectRandomHorses, createInitialProgress } from '../schedule'
import type { Horse } from '../types'

describe('selectRandomHorses', () => {
  const mockHorses: Horse[] = [
    { id: 'horse-1', name: 'Thunder', color: '#FF6B6B', conditionScore: 80 },
    { id: 'horse-2', name: 'Lightning', color: '#4ECDC4', conditionScore: 75 },
    { id: 'horse-3', name: 'Storm', color: '#45B7D1', conditionScore: 90 },
    { id: 'horse-4', name: 'Blaze', color: '#FFA07A', conditionScore: 65 },
    { id: 'horse-5', name: 'Shadow', color: '#98D8C8', conditionScore: 85 },
  ]

  it('should select the correct number of horses', () => {
    const selected = selectRandomHorses(mockHorses, 3)
    expect(selected).toHaveLength(3)
  })

  it('should return unique horses (no duplicates)', () => {
    const selected = selectRandomHorses(mockHorses, 3)
    const ids = selected.map((h) => h.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should not modify the original array', () => {
    const originalLength = mockHorses.length
    selectRandomHorses(mockHorses, 2)
    expect(mockHorses).toHaveLength(originalLength)
  })
})

describe('createInitialProgress', () => {
  it('should create progress map with all horses at 0', () => {
    const horses: Horse[] = [
      { id: 'horse-1', name: 'Thunder', color: '#FF6B6B', conditionScore: 80 },
      { id: 'horse-2', name: 'Lightning', color: '#4ECDC4', conditionScore: 75 },
    ]

    const progress = createInitialProgress(horses)

    expect(progress).toEqual({
      'horse-1': 0,
      'horse-2': 0,
    })
  })
})
