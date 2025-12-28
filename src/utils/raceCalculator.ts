import type { Horse, HorseWithPosition, HorseWithTime, RaceResult } from './types'

/**
 * Calculates race result
 * Sorts horses based on actual finish order from animation
 * @param horses - Array of horses participating in the race
 * @param distance - Race distance in meters
 * @param finishOrder - Actual finish order from animation (horse ids)
 * @returns Race result (standings, times)
 */
export function calculateRaceResult(
  horses: Horse[],
  distance: number,
  finishOrder: string[] = []
): RaceResult {
  // If finishOrder exists, use actual order from animation
  let sortedHorses: HorseWithPosition[]
  if (finishOrder && finishOrder.length > 0) {
    // Sort by finish order
    sortedHorses = finishOrder.map((horseId, index) => {
      const horse = horses.find((h) => h.id === horseId)
      if (!horse) {
        throw new Error(`Horse with id ${horseId} not found`)
      }
      return {
        ...horse,
        position: index + 1,
      }
    })
    // If some horses are not in finishOrder (error case), add them to the end
    const finishedIds = new Set(finishOrder)
    const unfinishedHorses = horses.filter((h) => !finishedIds.has(h.id))
    unfinishedHorses.forEach((horse, index) => {
      sortedHorses.push({
        ...horse,
        position: sortedHorses.length + index + 1,
      })
    })
  } else {
    // Fallback: Sort by condition score (old logic)
    sortedHorses = [...horses]
      .sort((a, b) => b.conditionScore - a.conditionScore)
      .map((horse, index) => ({
        ...horse,
        position: index + 1,
      }))
  }

  // Calculate time for each horse
  // Time is determined by distance and condition score
  const results: HorseWithTime[] = sortedHorses.map((horse) => {
    // Base time: based on distance (in seconds)
    // Longer distance = longer time
    const baseTime = distance / 10 // Example: 1200m = 120 seconds base

    // Correction factor based on condition score
    // Higher condition = faster (shorter time)
    const conditionFactor = 1 - (horse.conditionScore / 100) * 0.3 // Max 30% speed increase

    // Position bonus (top 3 finishers appear slightly faster)
    const positionBonus = horse.position <= 3 ? (4 - horse.position) * 0.05 : 0

    const finalTime = baseTime * (conditionFactor - positionBonus)
    const timeInSeconds = Math.max(finalTime, baseTime * 0.7) // Minimum time guarantee

    return {
      ...horse,
      time: parseFloat(timeInSeconds.toFixed(2)),
    }
  })

  if (results.length === 0) {
    throw new Error('No race results calculated')
  }

  const winner = results[0]
  if (!winner) {
    throw new Error('No winner found in race results')
  }

  return {
    standings: results,
    winner,
  }
}

