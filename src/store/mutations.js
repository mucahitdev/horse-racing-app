export default {
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  GENERATE_RACE_SCHEDULE(state, schedule) {
    state.raceSchedule = schedule
    state.currentRound = null
    state.raceResults = []
    state.raceProgress = {}
  },
  START_RACE(state) {
    state.isRacing = true
    state.currentRound = 0
  },
  SET_CURRENT_ROUND(state, roundIndex) {
    state.currentRound = roundIndex
  },
  SET_ROUND_RESULTS(state, result) {
    state.raceResults.push(result)
  },
  CLEAR_ROUND_RESULTS(state) {
    state.raceResults = []
  },
  UPDATE_RACE_PROGRESS(state, progress) {
    state.raceProgress = { ...state.raceProgress, ...progress }
  },
  RESET_RACE_PROGRESS(state) {
    state.raceProgress = {}
    state.finishOrder = []
  },
  ADD_FINISHED_HORSE(state, horseId) {
    if (!state.finishOrder.includes(horseId)) {
      state.finishOrder.push(horseId)
    }
  },
  FINISH_RACE(state) {
    state.isRacing = false
    state.isPaused = false
    state.currentRound = null
  },
  PAUSE_RACE(state, elapsedTime) {
    state.isPaused = true
    state.pausedElapsedTime = elapsedTime
  },
  RESUME_RACE(state) {
    state.isPaused = false
  },
  SET_RACE_START_TIME(state, time) {
    state.raceStartTime = time
  },
  SET_ANIMATION_FRAME_ID(state, id) {
    state.animationFrameId = id
  },
  RESET_GAME(state) {
    state.raceSchedule = []
    state.currentRound = null
    state.raceResults = []
    state.isRacing = false
    state.isPaused = false
    state.raceProgress = {}
    state.pausedElapsedTime = 0
    state.raceStartTime = null
    state.finishOrder = []
  },
}

