import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

export default function initReducers() {
  const technicalAreas = createReducer(
    window.STATE_FROM_SERVER.technicalAreas,
    {}
  )
  const indicators = createReducer(window.STATE_FROM_SERVER.indicators, {})
  const actions = createReducer(window.STATE_FROM_SERVER.actions, {})
  const planActionIds = createReducer(
    window.STATE_FROM_SERVER.planActionIds,
    {}
  )

  return combineReducers({
    technicalAreas: technicalAreas,
    indicators: indicators,
    actions: actions,
    planActionIds: planActionIds,
  })
}
