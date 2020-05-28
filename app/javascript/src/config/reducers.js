import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

const activities = createReducer(window.STATE_FROM_SERVER.activities, {
  noop: (state) => state,
})
const planActivities = createReducer(window.STATE_FROM_SERVER.planActivityIds, {
  noop: (state) => state,
})

export default combineReducers({
  activities: activities,
  planActivities: planActivities,
})
