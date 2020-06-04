import {
  DELETE_ACTION_FROM_PLAN,
  DELETE_ACTION_FROM_INDICATOR,
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
  }
}

export { deleteActionFromIndicator }
