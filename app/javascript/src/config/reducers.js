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
      console.log("DELETE_ACTION called..")
      const actionId = action.payload.id
      const indexOfActionId = state.indexOf(actionId)
      console.log(`DELETE_ACTION: `, actionId, indexOfActionId, state.length)
      if (indexOfActionId >= 0) {
        state.splice(indexOfActionId, 1)
      }
    },
  })

  return combineReducers({
    technicalAreas: technicalAreas,
    indicators: indicators,
    actions: actions,
    planActionIds: planActionIds,
  })
}
