export interface Horse {
  id: string
  name: string
  color: string
  conditionScore: number
}

export interface HorseWithPosition extends Horse {
  position: number
}

export interface HorseWithTime extends HorseWithPosition {
  time: number
}

export interface RaceResult {
  standings: HorseWithTime[]
  winner: HorseWithTime
}

export interface HorseDuration {
  horse: Horse
  duration: number
}

export type ProgressMap = Record<string, number>

