import { describe, it, expect } from 'vitest'
import { calculateRaceResult } from '../raceCalculator'
import type { Horse } from '../types'

describe('calculateRaceResult', () => {
  const mockHorses: Horse[] = [
    { id: 'horse-1', name: 'Thunder', color: '#FF6B6B', conditionScore: 100 },
    { id: 'horse-2', name: 'Lightning', color: '#4ECDC4', conditionScore: 80 },
    { id: 'horse-3', name: 'Storm', color: '#45B7D1', conditionScore: 60 },
  ]

  it('should sort horses by finish order when provided', () => {
    const finishOrder = ['horse-3', 'horse-1', 'horse-2']
    const result = calculateRaceResult(mockHorses, 1200, finishOrder)

    expect(result.standings[0]?.id).toBe('horse-3')
    expect(result.standings[0]?.position).toBe(1)
    expect(result.winner.id).toBe('horse-3')
  })

  it('should sort by condition score when finish order not provided', () => {
    const result = calculateRaceResult(mockHorses, 1200, [])

    expect(result.standings[0]?.id).toBe('horse-1')
    expect(result.standings[1]?.id).toBe('horse-2')
    expect(result.standings[2]?.id).toBe('horse-3')
  })

  it('should calculate time for each horse', () => {
    const result = calculateRaceResult(mockHorses, 1200, [])
    result.standings.forEach((horse) => {
      expect(horse.time).toBeGreaterThan(0)
    })
  })

  it('should throw error when horse id not found', () => {
    expect(() => {
      calculateRaceResult(mockHorses, 1200, ['invalid-id'])
    }).toThrow('Horse with id invalid-id not found')
  })
})
