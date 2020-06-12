import { createReducer } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import {
  ADD_ACTION_TO_PLAN,
  ADD_ACTION_TO_INDICATOR,
  ADD_ACTION_TO_NOT_IN_INDICATOR,
  DELETE_ACTION_FROM_PLAN,
  DELETE_ACTION_FROM_INDICATOR,
  DELETE_ACTION_FROM_NOT_IN_INDICATOR,
} from "./constants"

export default function initReducers() {
  const technicalAreas = createReducer(
    window.STATE_FROM_SERVER.technicalAreas,
    {}
  )
  const indicators = createReducer(window.STATE_FROM_SERVER.indicators, {})
  const actionMap = window.STATE_FROM_SERVER.actions.reduce((map, action) => {
    map[action.id] = action
    return map
  }, {})
  const actions = createReducer(actionMap, {})

  const planActionIds = createReducer(window.STATE_FROM_SERVER.planActionIds, {
    [ADD_ACTION_TO_PLAN]: (state, action) => {
      const actionIdToAdd = action.payload.actionId
      state.push(actionIdToAdd)
    },
    [DELETE_ACTION_FROM_PLAN]: (state, action) => {
      const actionIdToDelete = action.payload.actionId
      return state.filter((actionId) => actionId !== actionIdToDelete)
    },
  })

  const initialMapOfPlanActionIdsByIndicator = {}
  const initialMapOfPlanActionIdsNotInIndicator = {}
  let currentIndicatorId
  window.STATE_FROM_SERVER.actions.forEach((action) => {
    if (action.benchmark_indicator_id !== currentIndicatorId) {
      currentIndicatorId = action.benchmark_indicator_id
    }
    if (!initialMapOfPlanActionIdsByIndicator[currentIndicatorId]) {
      initialMapOfPlanActionIdsByIndicator[currentIndicatorId] = []
    }
    if (!initialMapOfPlanActionIdsNotInIndicator[currentIndicatorId]) {
      initialMapOfPlanActionIdsNotInIndicator[currentIndicatorId] = []
    }
    if (window.STATE_FROM_SERVER.planActionIds.indexOf(action.id) >= 0) {
      initialMapOfPlanActionIdsByIndicator[currentIndicatorId].push(action.id)
    } else {
      initialMapOfPlanActionIdsNotInIndicator[currentIndicatorId].push(
        action.id
      )
    }
  })

  const planActionIdsByIndicator = createReducer(
    initialMapOfPlanActionIdsByIndicator,
    {
      [ADD_ACTION_TO_INDICATOR]: (state, action) => {
        const indicatorId = action.payload.indicatorId
        const actionId = action.payload.actionId
        state[indicatorId].push(actionId)
      },
      [DELETE_ACTION_FROM_INDICATOR]: (state, action) => {
        const indicatorId = action.payload.indicatorId
        const actionId = action.payload.actionId
        state[indicatorId] = state[indicatorId].filter(
          (aid) => aid !== actionId
        )
      },
    }
  )

  const planActionIdsNotInIndicator = createReducer(
    initialMapOfPlanActionIdsNotInIndicator,
    {
      [ADD_ACTION_TO_NOT_IN_INDICATOR]: (state, action) => {
        const indicatorId = action.payload.indicatorId
        const actionId = action.payload.actionId
        state[indicatorId].unshift(actionId)
      },
      [DELETE_ACTION_FROM_NOT_IN_INDICATOR]: (state, action) => {
        const indicatorId = action.payload.indicatorId
        const actionId = action.payload.actionId
        state[indicatorId] = state[indicatorId].filter(
          (aid) => aid !== actionId
        )
      },
    }
  )

  const planChartLabels = createReducer(
    window.STATE_FROM_SERVER.planChartLabels,
    {}
  )
  const planChartSeries = createReducer(
    window.STATE_FROM_SERVER.planChartSeries,
    {}
  )

  return combineReducers({
    technicalAreas,
    indicators,
    actions,
    planActionIds,
    planActionIdsByIndicator,
    planActionIdsNotInIndicator,
    planChartLabels,
    planChartSeries,
  })
}
