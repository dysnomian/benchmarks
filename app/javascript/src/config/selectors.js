import { createSelector } from "@reduxjs/toolkit"

const getPlanActionIds = (state) => {
  console.log("getPlanActionIds selector called..")
  return state.planActionIds
}
const getActions = (state) => state.actions
const getPlanActionIdsByIndicator = (state) => state.planActionIdsByIndicator

const recalcPlanActionIdsByIndicator = createSelector(
  [getPlanActionIds, getActions, getPlanActionIdsByIndicator],
  (planActionIds, actions, planActionIdsByIndicator) => {
    console.log(
      "getPlanActionIdsByIndicator called..: ",
      planActionIds,
      typeof actions
    )
    const indicatorIds = Object.keys(planActionIdsByIndicator)
    indicatorIds.forEach((indicatorId) => {
      const actionIds = planActionIdsByIndicator[indicatorId]
      actionIds.forEach((actionId) => {
        const indexOfActionId = planActionIds.indexOf(actionId)
        if (indexOfActionId === -1) {
          planActionIdsByIndicator[indicatorId].splice(indexOfActionId, 1)
        }
      })
    })
    return planActionIdsByIndicator
  }
)

export default recalcPlanActionIdsByIndicator

/*
planActionIdsByIndicator = {
  17: [2, 3, 4],
  81: [3, 4, 5],
}
*/
