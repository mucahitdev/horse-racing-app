import type { Horse, HorseDuration, ProgressMap } from './types'

/**
 * Calculates duration for each horse based on condition score
 * @param horses - Array of horses
 * @param baseDuration - Base duration in milliseconds
 * @returns Array of objects with horse and duration
 */
export function calculateHorseDurations(horses: Horse[], baseDuration: number = 4000): HorseDuration[] {
  return horses.map((horse) => {
    const speedMultiplier = 0.5 + (horse.conditionScore / 100) * 0.5
    return {
      horse,
      duration: baseDuration / speedMultiplier, // Slower horses take longer
    }
  })
}

/**
 * Calculates progress for each horse based on elapsed time
 * @param horseDurations - Array of horse duration objects
 * @param elapsed - Elapsed time in milliseconds
 * @returns Progress map with horse ids as keys and progress (0-1) as values
 */
export function calculateHorseProgress(horseDurations: HorseDuration[], elapsed: number): ProgressMap {
  const progressMap: ProgressMap = {}
  horseDurations.forEach(({ horse, duration }) => {
    // Each horse progresses according to their own duration
    const horseProgress = Math.min(elapsed / duration, 1)
    progressMap[horse.id] = horseProgress
  })
  return progressMap
}

/**
 * Checks if all horses have finished the race
 * @param progressMap - Progress map with horse ids and progress values
 * @returns True if all horses have progress >= 1
 */
export function areAllHorsesFinished(progressMap: ProgressMap): boolean {
  return Object.values(progressMap).every((progress) => progress >= 1)
}

/**
 * Calculates start time considering paused elapsed time
 * @param currentStartTime - Current start time
 * @param pausedElapsedTime - Paused elapsed time in milliseconds
 * @returns Start time in milliseconds
 */
export function calculateStartTime(currentStartTime: number | null, pausedElapsedTime: number = 0): number {
  if (currentStartTime) {
    return currentStartTime
  }
  if (pausedElapsedTime > 0) {
    return Date.now() - pausedElapsedTime
  }
  return Date.now()
}

