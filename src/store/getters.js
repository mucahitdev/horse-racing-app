export default {
  currentRoundData: (state) => {
    if (state.currentRound === null || !state.raceSchedule[state.currentRound]) {
      return null
    }
    return state.raceSchedule[state.currentRound]
  },
  hasRaceSchedule: (state) => state.raceSchedule.length > 0,
  allRoundsCompleted: (state) => {
    return state.raceResults.length === 6 && !state.isRacing
  },
}

