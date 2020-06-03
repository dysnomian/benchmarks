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
      const stateSnap = Array.from(state)
      const actionId = action.payload.id
      const indexOfActionId = stateSnap.indexOf(actionId)
      console.log(
        `DELETE_ACTION: `,
        actionId,
        indexOfActionId,
        stateSnap.length
      )
      if (indexOfActionId >= 0) {
        stateSnap.splice(indexOfActionId, 1)
        // return stateSnap.filter(aid => actionId !== aid)
      }
      console.log("state.len::", stateSnap.length)
      return stateSnap
    },
  })

  return combineReducers({
    technicalAreas: technicalAreas,
    indicators: indicators,
    actions: actions,
    planActionIds: planActionIds,
  })
}
