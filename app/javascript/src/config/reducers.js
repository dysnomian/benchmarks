import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import DELETE_ACTION from "../constants"

export default function initReducers() {
  const technicalAreas = createReducer(
    window.STATE_FROM_SERVER.technicalAreas,
    {}
  )
  const indicators = createReducer(window.STATE_FROM_SERVER.indicators, {})
  const actions = createReducer(window.STATE_FROM_SERVER.actions, {})
  const planActionIds = createReducer(window.STATE_FROM_SERVER.planActionIds, {
    [DELETE_ACTION]: (state, action) => {
      const actionId = action.payload.id
      const indexOfActionId = state.indexOf(actionId)
      if (indexOfActionId >= 0) {
        state.splice(indexOfActionId, 1)
      }
    },
  })

  const mapOfPlanActionIdsByTechnicalArea = {}
  const mapOfPlanActionIdsByIndicator = {}
  const organizePlanActionIdsByTechnicalArea = function () {
    let currentTechnicalAreaId
    let currentIndicatorId
    window.STATE_FROM_SERVER.actions.forEach((action) => {
      if (currentTechnicalAreaId !== action.benchmark_technical_area_id) {
        currentTechnicalAreaId = action.benchmark_technical_area_id
      }
      if (currentIndicatorId !== action.benchmark_indicator_id) {
        currentIndicatorId = action.benchmark_indicator_id
      }
      if (!mapOfPlanActionIdsByTechnicalArea[currentTechnicalAreaId]) {
        mapOfPlanActionIdsByTechnicalArea[currentTechnicalAreaId] = []
      }
      if (window.STATE_FROM_SERVER.planActionIds.indexOf(action.id) >= 0) {
        mapOfPlanActionIdsByTechnicalArea[currentTechnicalAreaId].push(
          action.id
        )
      }
      if (!mapOfPlanActionIdsByIndicator[currentIndicatorId]) {
        mapOfPlanActionIdsByIndicator[currentIndicatorId] = []
      }
      if (window.STATE_FROM_SERVER.planActionIds.indexOf(action.id) >= 0) {
        mapOfPlanActionIdsByIndicator[currentIndicatorId].push(action.id)
      }
    })
  }
  organizePlanActionIdsByTechnicalArea()
  const planActionIdsByTechnicalArea = createReducer(
    mapOfPlanActionIdsByTechnicalArea,
    {}
  )
  const planActionIdsByIndicator = createReducer(
    mapOfPlanActionIdsByIndicator,
    {}
  )

  return combineReducers({
    technicalAreas: technicalAreas,
    indicators: indicators,
    actions: actions,
    planActionIds: planActionIds,
    planActionIdsByTechnicalArea: planActionIdsByTechnicalArea,
    planActionIdsByIndicator: planActionIdsByIndicator,
  })
}

/*
planActionIdsByTechnicalArea = {
  17: [1, 2, 3],
  81: [2, 3, 4],
}
planActionIdsByIndicator = {
  17: [2, 3, 4],
  81: [3, 4, 5],
}
*/
