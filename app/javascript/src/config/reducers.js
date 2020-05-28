import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

const technicalAreas = createReducer(
  window.STATE_FROM_SERVER.technicalAreas,
  {}
)
const indicators = createReducer(window.STATE_FROM_SERVER.indicators, {})
const activities = createReducer(window.STATE_FROM_SERVER.activities, {})
const planActivities = createReducer(
  window.STATE_FROM_SERVER.planActivityIds,
  {}
)

export default combineReducers({
  technicalAreas: technicalAreas,
  indicators: indicators,
  activities: activities,
  planActivities: planActivities,
})
