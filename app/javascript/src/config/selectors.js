import { createSelector } from "@reduxjs/toolkit"

const getPlanActionIds = (state) => {
  return state.planActionIds
}
const getActions = (state) => state.actions

/*
Builds and returns data structure:
planActionIdsByIndicator = {
  17: // indicatorId
    [2, 3, 4], // array of actionId, zero or more
  81:
    [3, 4, 5],
  ...
}
*/
const recalcPlanActionIdsByIndicator = createSelector(
  [getPlanActionIds, getActions],
  (planActionIds, actions) => {
    console.log("recalcPlanActionIdsByIndicator called.. ")
    const mapOfPlanActionIdsByIndicator = {}
    let currentIndicatorId
    actions.forEach((action) => {
      if (action.benchmark_indicator_id !== currentIndicatorId) {
        currentIndicatorId = action.benchmark_indicator_id
      }
      if (!mapOfPlanActionIdsByIndicator[currentIndicatorId]) {
        mapOfPlanActionIdsByIndicator[currentIndicatorId] = []
      }
      if (planActionIds.indexOf(action.id) >= 0) {
        mapOfPlanActionIdsByIndicator[currentIndicatorId].push(action.id)
      }
    })
    return mapOfPlanActionIdsByIndicator
  }
)

export default recalcPlanActionIdsByIndicator
