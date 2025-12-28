import { describe, it, expect } from 'vitest'
// @ts-ignore - getters.js is not typed
import getters from '../getters'
import type { Horse } from '../../utils/types'

describe('getters', () => {
  const createState = () => ({
    horses: [] as Horse[],
    raceSchedule: [] as any[],
    currentRound: null as number | null,
    raceResults: [] as any[],
    isRacing: false,
    isPaused: false,
    raceProgress: {},
    animationFrameId: null as number | null,
    pausedElapsedTime: 0,
    raceStartTime: null as number | null,
    finishOrder: [] as string[],
  })

  describe('currentRoundData', () => {
    it('should return null when currentRound is null', () => {
      const state = createState()
      expect(getters.currentRoundData(state)).toBe(null)
    })

    it('should return null when raceSchedule is empty', () => {
      const state = createState()
      state.currentRound = 0
      expect(getters.currentRoundData(state)).toBe(null)
    })

    it('should return current round data when valid', () => {
      const state = createState()
      const roundData = { round: 1, distance: 1200, horses: [] }
      state.raceSchedule = [roundData]
      state.currentRound = 0
      expect(getters.currentRoundData(state)).toEqual(roundData)
    })
  })

  describe('hasRaceSchedule', () => {
    it('should return false when raceSchedule is empty', () => {
      const state = createState()
      expect(getters.hasRaceSchedule(state)).toBe(false)
    })

    it('should return true when raceSchedule has items', () => {
      const state = createState()
      state.raceSchedule = [{ round: 1, distance: 1200, horses: [] }]
      expect(getters.hasRaceSchedule(state)).toBe(true)
    })
  })

  describe('allRoundsCompleted', () => {
    it('should return false when raceResults length is not 6', () => {
      const state = createState()
      state.raceResults = [{} as any]
      state.isRacing = false
      expect(getters.allRoundsCompleted(state)).toBe(false)
    })

    it('should return false when isRacing is true', () => {
      const state = createState()
      state.raceResults = [{}, {}, {}, {}, {}, {}] as any[]
      state.isRacing = true
      expect(getters.allRoundsCompleted(state)).toBe(false)
    })

    it('should return true when 6 results and not racing', () => {
      const state = createState()
      state.raceResults = [{}, {}, {}, {}, {}, {}] as any[]
      state.isRacing = false
      expect(getters.allRoundsCompleted(state)).toBe(true)
    })
  })
})

