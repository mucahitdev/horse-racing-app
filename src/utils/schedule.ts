import type { Horse, ProgressMap } from './types'

/**
 * Selects random horses from available horses
 * @param availableHorses - Array of available horses
 * @param count - Number of horses to select
 * @returns Array of selected horses
 */
export function selectRandomHorses(availableHorses: Horse[], count: number = 10): Horse[] {
  const horses = [...availableHorses]
  const selectedHorses: Horse[] = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * horses.length)
    const selectedHorse = horses.splice(randomIndex, 1)[0]
    if (selectedHorse) {
      selectedHorses.push(selectedHorse)
    }
  }

  return selectedHorses
}

/**
 * Creates initial progress map for horses
 * @param horses - Array of horses
 * @returns Progress map with horse ids as keys and 0 as initial value
 */
export function createInitialProgress(horses: Horse[]): ProgressMap {
  const progress: ProgressMap = {}
  horses.forEach((horse) => {
    progress[horse.id] = 0
  })
  return progress
}

