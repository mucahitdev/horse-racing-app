import { describe, it, expect } from 'vitest'
// @ts-ignore - mutations.js is not typed
import mutations from '../mutations'
import type { Horse } from '../../utils/types'

describe('mutations', () => {
  const createState = () => ({
    horses: [] as Horse[],
    raceSchedule: [] as any[],
    currentRound: null as number | null,
    raceResults: [] as any[],
    isRacing: false,
    isPaused: false,
    raceProgress: {} as Record<string, number>,
    animationFrameId: null as number | null,
    pausedElapsedTime: 0,
    raceStartTime: null as number | null,
    finishOrder: [] as string[],
  })

  describe('SET_HORSES', () => {
    it('should set horses in state', () => {
      const state = createState()
      const horses: Horse[] = [
        { id: 'horse-1', name: 'Thunder', color: '#FF6B6B', conditionScore: 80 },
      ]
      mutations.SET_HORSES(state, horses)
      expect(state.horses).toEqual(horses)
    })
  })

  describe('GENERATE_RACE_SCHEDULE', () => {
    it('should set race schedule and reset related state', () => {
      const state = createState()
      const schedule = [
        { round: 1, distance: 1200, horses: [] },
      ]
      mutations.GENERATE_RACE_SCHEDULE(state, schedule)
      expect(state.raceSchedule).toEqual(schedule)
      expect(state.currentRound).toBe(null)
      expect(state.raceResults).toEqual([])
      expect(state.raceProgress).toEqual({})
    })
  })

  describe('START_RACE', () => {
    it('should set isRacing to true and currentRound to 0', () => {
      const state = createState()
      mutations.START_RACE(state)
      expect(state.isRacing).toBe(true)
      expect(state.currentRound).toBe(0)
    })
  })

  describe('SET_CURRENT_ROUND', () => {
    it('should set current round index', () => {
      const state = createState()
      mutations.SET_CURRENT_ROUND(state, 2)
      expect(state.currentRound).toBe(2)
    })
  })

  describe('SET_ROUND_RESULTS', () => {
    it('should add result to raceResults array', () => {
      const state = createState()
      const result = { round: 1, distance: 1200, horses: [], winner: {} as any }
      mutations.SET_ROUND_RESULTS(state, result)
      expect(state.raceResults).toHaveLength(1)
      expect(state.raceResults[0]).toEqual(result)
    })
  })

  describe('UPDATE_RACE_PROGRESS', () => {
    it('should merge progress into raceProgress', () => {
      const state = createState()
      mutations.UPDATE_RACE_PROGRESS(state, { 'horse-1': 0.5 })
      expect(state.raceProgress['horse-1']).toBe(0.5)
      
      mutations.UPDATE_RACE_PROGRESS(state, { 'horse-2': 0.8 })
      expect(state.raceProgress['horse-1']).toBe(0.5)
      expect(state.raceProgress['horse-2']).toBe(0.8)
    })
  })

  describe('RESET_RACE_PROGRESS', () => {
    it('should reset raceProgress and finishOrder', () => {
      const state = createState()
      state.raceProgress = { 'horse-1': 0.5 }
      state.finishOrder = ['horse-1']
      mutations.RESET_RACE_PROGRESS(state)
      expect(state.raceProgress).toEqual({})
      expect(state.finishOrder).toEqual([])
    })
  })

  describe('ADD_FINISHED_HORSE', () => {
    it('should add horse id to finishOrder if not already present', () => {
      const state = createState()
      mutations.ADD_FINISHED_HORSE(state, 'horse-1')
      expect(state.finishOrder).toContain('horse-1')
      
      mutations.ADD_FINISHED_HORSE(state, 'horse-1')
      expect(state.finishOrder.filter(id => id === 'horse-1')).toHaveLength(1)
    })
  })

  describe('FINISH_RACE', () => {
    it('should set isRacing and isPaused to false, currentRound to null', () => {
      const state = createState()
      state.isRacing = true
      state.isPaused = true
      state.currentRound = 2
      mutations.FINISH_RACE(state)
      expect(state.isRacing).toBe(false)
      expect(state.isPaused).toBe(false)
      expect(state.currentRound).toBe(null)
    })
  })

  describe('PAUSE_RACE', () => {
    it('should set isPaused to true and pausedElapsedTime', () => {
      const state = createState()
      mutations.PAUSE_RACE(state, 5000)
      expect(state.isPaused).toBe(true)
      expect(state.pausedElapsedTime).toBe(5000)
    })
  })

  describe('RESUME_RACE', () => {
    it('should set isPaused to false', () => {
      const state = createState()
      state.isPaused = true
      mutations.RESUME_RACE(state)
      expect(state.isPaused).toBe(false)
    })
  })

  describe('RESET_GAME', () => {
    it('should reset all game state', () => {
      const state = createState()
      state.raceSchedule = [{ round: 1, distance: 1200, horses: [] }]
      state.currentRound = 2
      state.raceResults = [{} as any]
      state.isRacing = true
      state.isPaused = true
      state.raceProgress = { 'horse-1': 0.5 }
      state.pausedElapsedTime = 5000
      state.raceStartTime = 1000
      state.finishOrder = ['horse-1']
      
      mutations.RESET_GAME(state)
      
      expect(state.raceSchedule).toEqual([])
      expect(state.currentRound).toBe(null)
      expect(state.raceResults).toEqual([])
      expect(state.isRacing).toBe(false)
      expect(state.isPaused).toBe(false)
      expect(state.raceProgress).toEqual({})
      expect(state.pausedElapsedTime).toBe(0)
      expect(state.raceStartTime).toBe(null)
      expect(state.finishOrder).toEqual([])
    })
  })
})

