import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import { /*ORGANIZE_ACTIONS_BY_INDICATOR,*/ DELETE_ACTION } from "../constants"

export default function initReducers() {
  const technicalAreas = createReducer(
    window.STATE_FROM_SERVER.technicalAreas,
    {}
  )
  const indicators = createReducer(window.STATE_FROM_SERVER.indicators, {})
  const actions = createReducer(window.STATE_FROM_SERVER.actions, {})
  const planActionIds = createReducer(window.STATE_FROM_SERVER.planActionIds, {
    // [ORGANIZE_ACTIONS_BY_INDICATOR]: (state, action) => {
    // },
    [DELETE_ACTION]: (state, action) => {
      console.log("DELETE_ACTION called.. ", action.payload)
      const actionId = action.payload.id
      return state.filter((aid) => actionId !== aid)
    },
  })

  return combineReducers({
    technicalAreas: technicalAreas,
    indicators: indicators,
    actions: actions,
    planActionIds: planActionIds,
  })
}
