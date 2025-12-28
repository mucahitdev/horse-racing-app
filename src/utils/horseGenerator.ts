import { HORSE_NAMES, COLORS } from '../constants'
import type { Horse } from './types'

/**
 * Generates specified number of horses
 * @param count - Number of horses to generate
 * @returns Array of horses
 */
export function generateHorses(count: number = 20): Horse[] {
  const horses: Horse[] = []
  const usedNames = new Set<string>()
  const usedColors = new Set<string>()

  for (let i = 0; i < count; i++) {
    // Select unique name
    let name: string
    let nameIndex: number
    do {
      nameIndex = Math.floor(Math.random() * HORSE_NAMES.length)
      const selectedName = HORSE_NAMES[nameIndex]
      if (!selectedName) {
        throw new Error(`Invalid name index: ${nameIndex}`)
      }
      name = selectedName
    } while (usedNames.has(name))
    usedNames.add(name)

    // Select unique color
    let color: string
    let colorIndex: number
    do {
      colorIndex = Math.floor(Math.random() * COLORS.length)
      const selectedColor = COLORS[colorIndex]
      if (!selectedColor) {
        throw new Error(`Invalid color index: ${colorIndex}`)
      }
      color = selectedColor
    } while (usedColors.has(color))
    usedColors.add(color)

    // Condition score: random between 1-100
    const conditionScore = Math.floor(Math.random() * 100) + 1

    horses.push({
      id: `horse-${i + 1}`,
      name,
      color,
      conditionScore,
    })
  }

  return horses
}

