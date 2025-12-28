import { describe, it, expect } from 'vitest'
import { getTextColor } from '../colorUtils'

describe('getTextColor', () => {
  it('should return black for light backgrounds', () => {
    expect(getTextColor('#FFFFFF')).toBe('#000000')
    expect(getTextColor('#FF6B6B')).toBe('#000000')
  })

  it('should return white for dark backgrounds', () => {
    expect(getTextColor('#000000')).toBe('#FFFFFF')
    expect(getTextColor('#34495E')).toBe('#FFFFFF')
  })

  it('should handle hex colors with or without # prefix', () => {
    expect(getTextColor('#FFFFFF')).toBe('#000000')
    expect(getTextColor('FFFFFF')).toBe('#000000')
  })
})
