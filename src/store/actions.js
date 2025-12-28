import { ROUND_DISTANCES } from '../constants'
import { generateHorses } from '../utils/horseGenerator'
import { calculateRaceResult } from '../utils/raceCalculator'
import { selectRandomHorses, createInitialProgress } from '../utils/schedule'
import {
  calculateHorseDurations,
  calculateHorseProgress,
  areAllHorsesFinished,
  calculateStartTime,
} from '../utils/animation'

export default {
  generateHorses({ commit }) {
    const horses = generateHorses(20)
    commit('SET_HORSES', horses)
  },
  generateProgram({ dispatch, state, commit }) {
    // Stop active race if running
    if (state.isRacing) {
      dispatch('stopRace')
    }

    // Reset all game data
    commit('RESET_GAME')

    // Generate horse list
    dispatch('generateHorses')

    // Generate schedule (generateHorses is sync so we can call directly)
    dispatch('generateRaceSchedule')
  },
  generateRaceSchedule({ commit, state }) {
    if (state.horses.length === 0) {
      throw new Error('Horses must be generated first')
    }

    const schedule = ROUND_DISTANCES.map((distance, index) => {
      const selectedHorses = selectRandomHorses(state.horses, 10)

      return {
        round: index + 1,
        distance,
        horses: selectedHorses,
      }
    })

    commit('GENERATE_RACE_SCHEDULE', schedule)
  },
  pauseRace({ commit, state }) {
    if (state.isRacing && !state.isPaused) {
      // Save current elapsed time (if raceStartTime exists)
      if (state.raceStartTime) {
        const elapsed = Date.now() - state.raceStartTime
        commit('PAUSE_RACE', elapsed)
      } else {
        commit('PAUSE_RACE', 0)
      }
      // Don't cancel animation frame, just set pause flag
      // animate function will just wait in pause state
    }
  },
  resumeRace({ commit, state }) {
    if (state.isRacing && state.isPaused) {
      commit('RESUME_RACE')
      // Update start time (account for paused elapsed time)
      if (state.pausedElapsedTime > 0) {
        commit('SET_RACE_START_TIME', Date.now() - state.pausedElapsedTime)
        state.pausedElapsedTime = 0 // Reset
      }
      // Animation is already running, will continue with resume flag
    }
  },
  stopRace({ commit, state }) {
    if (state.isRacing) {
      // Stop animation
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId)
        commit('SET_ANIMATION_FRAME_ID', null)
      }
      // Clear race state
      commit('FINISH_RACE')
      commit('RESET_RACE_PROGRESS')
      commit('SET_RACE_START_TIME', null)
      state.pausedElapsedTime = 0
    }
  },
  async runRace({ commit, state, dispatch }) {
    if (state.raceSchedule.length === 0) {
      throw new Error('Race schedule must be generated first')
    }

    // Clear previous race data
    commit('RESET_RACE_PROGRESS')
    commit('CLEAR_ROUND_RESULTS')

    commit('START_RACE')

    for (let i = 0; i < state.raceSchedule.length; i++) {
      commit('SET_CURRENT_ROUND', i)
      commit('RESET_RACE_PROGRESS') // This also clears finishOrder
      // Reset start time for each round
      commit('SET_RACE_START_TIME', null)
      state.pausedElapsedTime = 0

      const round = state.raceSchedule[i]
      const horses = round.horses

      // Initialize progress for animation
      const initialProgress = createInitialProgress(horses)
      commit('UPDATE_RACE_PROGRESS', initialProgress)

      // Start animation and calculate result
      await dispatch('animateRace', { round, horses })

      // Save result - based on actual finish order from animation
      const result = calculateRaceResult(horses, round.distance, state.finishOrder)
      commit('SET_ROUND_RESULTS', {
        round: round.round,
        distance: round.distance,
        horses: result.standings || result.horses || [],
        winner: result.winner,
      })
    }

    commit('FINISH_RACE')
  },
  animateRace({ commit, state }, { horses }) {
    return new Promise((resolve) => {
      const baseDuration = 4000 // Base 4 seconds

      // Calculate duration for each horse based on condition score
      const horseDurations = calculateHorseDurations(horses, baseDuration)

      // Set start time (account for pausedElapsedTime if resuming from pause)
      if (!state.raceStartTime) {
        const startTime = calculateStartTime(null, state.pausedElapsedTime)
        commit('SET_RACE_START_TIME', startTime)
      }

      const animate = () => {
        // Pause check - if paused, just wait and continue
        if (state.isPaused) {
          const frameId = requestAnimationFrame(animate)
          commit('SET_ANIMATION_FRAME_ID', frameId)
          return
        }

        // Get start time from state (will be updated when resumed)
        const startTime = state.raceStartTime || Date.now()
        if (!state.raceStartTime) {
          commit('SET_RACE_START_TIME', startTime)
        }

        const now = Date.now()
        const elapsed = now - startTime

        // Calculate progress for each horse based on their own speed
        const progressMap = calculateHorseProgress(horseDurations, elapsed)

        // Add finished horses to finish order
        horseDurations.forEach(({ horse }) => {
          if (progressMap[horse.id] >= 1 && !state.finishOrder.includes(horse.id)) {
            commit('ADD_FINISHED_HORSE', horse.id)
          }
        })

        commit('UPDATE_RACE_PROGRESS', progressMap)

        // Continue until all horses finish
        const allFinished = areAllHorsesFinished(progressMap)

        if (!allFinished) {
          const frameId = requestAnimationFrame(animate)
          commit('SET_ANIMATION_FRAME_ID', frameId)
        } else {
          // All horses finished, round completed
          commit('SET_ANIMATION_FRAME_ID', null)
          commit('SET_RACE_START_TIME', null)
          state.pausedElapsedTime = 0
          resolve()
        }
      }

      // Start animation
      const frameId = requestAnimationFrame(animate)
      commit('SET_ANIMATION_FRAME_ID', frameId)
    })
  },
  resetGame({ commit }) {
    commit('RESET_GAME')
  },
}

