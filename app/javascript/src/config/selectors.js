import { createSelector } from "@reduxjs/toolkit"

const getPlanActionIds = (state) => state.planActionIds
const getActions = (state) => state.actions

const getPlanActionIdsByIndicator = createSelector(
  [getPlanActionIds, getActions],
  (planActionIds, actions) => {
    let currentIndicatorId
    const mapOfPlanActionIdsByIndicator = {}
    actions.forEach((action) => {
      if (action.benchmark_indicator_id !== currentIndicatorId) {
        currentIndicatorId = action.benchmark_indicator_id
      }
      if (!mapOfPlanActionIdsByIndicator[currentIndicatorId]) {
        mapOfPlanActionIdsByIndicator[currentIndicatorId] = []
      }
      if (window.STATE_FROM_SERVER.planActionIds.indexOf(action.id) >= 0) {
        mapOfPlanActionIdsByIndicator[currentIndicatorId].push(action.id)
      }
    })
    return mapOfPlanActionIdsByIndicator
  }
)

export default getPlanActionIdsByIndicator
