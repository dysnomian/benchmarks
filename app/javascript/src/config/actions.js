import {
  ADD_ACTION_TO_PLAN,
  ADD_ACTION_TO_INDICATOR,
  ADD_ACTION_TO_NOT_IN_INDICATOR,
  DELETE_ACTION_FROM_PLAN,
  DELETE_ACTION_FROM_INDICATOR,
  DELETE_ACTION_FROM_NOT_IN_INDICATOR,
} from "./constants"

const deleteActionFromIndicator = (actionId, indicatorId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ACTION_FROM_PLAN,
      payload: { actionId: actionId },
    })
    dispatch({
      type: DELETE_ACTION_FROM_INDICATOR,
      payload: { actionId: actionId, indicatorId: indicatorId },
    })
    dispatch({
      type: ADD_ACTION_TO_NOT_IN_INDICATOR,
      payload: { actionId: actionId, indicatorId: indicatorId },
    })
  }
}

const addActionToIndicator = (actionId, indicatorId) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ACTION_TO_PLAN,
      payload: { actionId: actionId },
    })
    dispatch({
      type: ADD_ACTION_TO_INDICATOR,
      payload: { actionId: actionId, indicatorId: indicatorId },
    })
    dispatch({
      type: DELETE_ACTION_FROM_NOT_IN_INDICATOR,
      payload: { actionId: actionId, indicatorId: indicatorId },
    })
  }
}

export { addActionToIndicator, deleteActionFromIndicator }
