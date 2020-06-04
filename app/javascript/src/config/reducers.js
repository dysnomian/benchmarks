import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import { DELETE_ACTION_FROM_INDICATOR, DELETE_ACTION } from "./constants"

export default function initReducers() {
  const technicalAreas = createReducer(
    window.STATE_FROM_SERVER.technicalAreas,
    {}
  )
  const indicators = createReducer(window.STATE_FROM_SERVER.indicators, {})
  const actions = createReducer(window.STATE_FROM_SERVER.actions, {})
  const planActionIds = createReducer(window.STATE_FROM_SERVER.planActionIds, {
    [DELETE_ACTION]: (state, action) => {
      // console.log("DELETE_ACTION called.. ", state, action.payload)
      const actionId = action.payload.id
      let newState = [...state]
      newState = newState.filter((aid) => actionId !== aid)
      return newState
    },
  })

  const initialMapOfPlanActionIdsByIndicator = {}
  let currentIndicatorId
  window.STATE_FROM_SERVER.actions.forEach((action) => {
    if (action.benchmark_indicator_id !== currentIndicatorId) {
      currentIndicatorId = action.benchmark_indicator_id
    }
    if (!initialMapOfPlanActionIdsByIndicator[currentIndicatorId]) {
      initialMapOfPlanActionIdsByIndicator[currentIndicatorId] = []
    }
    if (window.STATE_FROM_SERVER.planActionIds.indexOf(action.id) >= 0) {
      initialMapOfPlanActionIdsByIndicator[currentIndicatorId].push(action.id)
    }
  })
  const planActionIdsByIndicator = createReducer(
    initialMapOfPlanActionIdsByIndicator,
    {
      [DELETE_ACTION_FROM_INDICATOR]: (state, action) => {
        // console.log("DELETE_ACTION_FROM_INDICATOR:: ", state, action)
        const indicatorId = action.payload.indicatorId
        const actionId = action.payload.actionId
        const newState = { ...state }
        newState[indicatorId] = newState[indicatorId].filter(
          (aid) => aid !== actionId
        )
        return newState
      },
    }
  )

  return combineReducers({
    technicalAreas: technicalAreas,
    indicators: indicators,
    actions: actions,
    planActionIds: planActionIds,
    planActionIdsByIndicator: planActionIdsByIndicator,
  })
}
