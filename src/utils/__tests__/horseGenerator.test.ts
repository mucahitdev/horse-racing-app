import { describe, it, expect } from 'vitest'
import { generateHorses } from '../horseGenerator'
import { HORSE_NAMES, COLORS } from '../../constants'

describe('generateHorses', () => {
  it('should generate the specified number of horses', () => {
    const horses = generateHorses(20)
    expect(horses).toHaveLength(20)
  })

  it('should generate horses with unique names and colors', () => {
    const horses = generateHorses(10)
    const names = horses.map((h) => h.name)
    const colors = horses.map((h) => h.color)
    
    expect(new Set(names).size).toBe(10)
    expect(new Set(colors).size).toBe(10)
  })

  it('should generate horses with valid structure and condition scores', () => {
    const horses = generateHorses(5)
    
    horses.forEach((horse) => {
      expect(horse).toHaveProperty('id')
      expect(horse).toHaveProperty('name')
      expect(horse).toHaveProperty('color')
      expect(horse).toHaveProperty('conditionScore')
      expect(horse.conditionScore).toBeGreaterThanOrEqual(1)
      expect(horse.conditionScore).toBeLessThanOrEqual(100)
      expect(HORSE_NAMES).toContain(horse.name)
      expect(COLORS).toContain(horse.color)
    })
  })
})
