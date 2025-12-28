import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = createStore({
  state() {
    return {
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
    }
  },
  mutations,
  actions,
  getters,
})

export default store
