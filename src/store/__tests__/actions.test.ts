import { describe, it, expect, vi, beforeEach } from 'vitest'
// @ts-ignore - actions.js is not typed
import actions from '../actions'
import type { Horse } from '../../utils/types'

describe('actions', () => {
  const createContext = (state: any = {}) => {
    const commit = vi.fn()
    const dispatch = vi.fn()
    const getters = {}
    
    return {
      commit,
      dispatch,
      state: {
        horses: [],
        raceSchedule: [],
        currentRound: null,
        raceResults: [],
        isRacing: false,
        isPaused: false,
        raceProgress: {},
        animationFrameId: null,
        pausedElapsedTime: 0,
        raceStartTime: null,
        finishOrder: [],
        ...state,
      },
      getters,
      rootState: {},
      rootGetters: {},
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateHorses', () => {
    it('should commit SET_HORSES with 20 horses', () => {
      const context = createContext()
      actions.generateHorses(context)
      
      expect(context.commit).toHaveBeenCalledWith('SET_HORSES', expect.any(Array))
      const horses = context.commit.mock.calls[0]?.[1]
      expect(horses).toHaveLength(20)
    })
  })

  describe('generateRaceSchedule', () => {
    it('should commit GENERATE_RACE_SCHEDULE with 6 rounds', () => {
      const context = createContext({
        horses: Array.from({ length: 20 }, (_, i) => ({
          id: `horse-${i + 1}`,
          name: `Horse ${i + 1}`,
          color: '#FF6B6B',
          conditionScore: 80,
        })) as Horse[],
      })
      
      actions.generateRaceSchedule(context)
      
      expect(context.commit).toHaveBeenCalledWith('GENERATE_RACE_SCHEDULE', expect.any(Array))
      const schedule = context.commit.mock.calls[0]?.[1]
      expect(schedule).toHaveLength(6)
      expect(schedule[0]?.round).toBe(1)
      expect(schedule[0]?.horses).toHaveLength(10)
    })

    it('should throw error when horses array is empty', () => {
      const context = createContext({ horses: [] })
      
      expect(() => {
        actions.generateRaceSchedule(context)
      }).toThrow('Horses must be generated first')
    })
  })

  describe('pauseRace', () => {
    it('should commit PAUSE_RACE when race is active and not paused', () => {
      const context = createContext({
        isRacing: true,
        isPaused: false,
        raceStartTime: Date.now() - 5000,
      })
      
      actions.pauseRace(context)
      
      expect(context.commit).toHaveBeenCalledWith('PAUSE_RACE', expect.any(Number))
    })

    it('should not pause when race is not active', () => {
      const context = createContext({
        isRacing: false,
        isPaused: false,
      })
      
      actions.pauseRace(context)
      
      expect(context.commit).not.toHaveBeenCalledWith('PAUSE_RACE', expect.any(Number))
    })
  })

  describe('resumeRace', () => {
    it('should commit RESUME_RACE and update start time when paused', () => {
      const context = createContext({
        isRacing: true,
        isPaused: true,
        pausedElapsedTime: 5000,
      })
      
      actions.resumeRace(context)
      
      expect(context.commit).toHaveBeenCalledWith('RESUME_RACE')
      expect(context.commit).toHaveBeenCalledWith('SET_RACE_START_TIME', expect.any(Number))
    })

    it('should not resume when race is not paused', () => {
      const context = createContext({
        isRacing: true,
        isPaused: false,
      })
      
      actions.resumeRace(context)
      
      expect(context.commit).not.toHaveBeenCalledWith('RESUME_RACE')
    })
  })

  describe('stopRace', () => {
    it('should cancel animation and finish race when active', () => {
      const mockCancelAnimationFrame = vi.fn()
      globalThis.cancelAnimationFrame = mockCancelAnimationFrame as any
      
      const context = createContext({
        isRacing: true,
        animationFrameId: 123,
      })
      
      actions.stopRace(context)
      
      expect(mockCancelAnimationFrame).toHaveBeenCalledWith(123)
      expect(context.commit).toHaveBeenCalledWith('SET_ANIMATION_FRAME_ID', null)
      expect(context.commit).toHaveBeenCalledWith('FINISH_RACE')
      expect(context.commit).toHaveBeenCalledWith('RESET_RACE_PROGRESS')
    })

    it('should not stop when race is not active', () => {
      const context = createContext({
        isRacing: false,
      })
      
      actions.stopRace(context)
      
      expect(context.commit).not.toHaveBeenCalledWith('FINISH_RACE')
    })
  })

  describe('resetGame', () => {
    it('should commit RESET_GAME', () => {
      const context = createContext()
      actions.resetGame(context)
      expect(context.commit).toHaveBeenCalledWith('RESET_GAME')
    })
  })
})

