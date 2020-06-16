import {
  ADD_ACTION_TO_PLAN,
  ADD_ACTION_TO_INDICATOR,
  ADD_ACTION_TO_NOT_IN_INDICATOR,
  DELETE_ACTION_FROM_PLAN,
  DELETE_ACTION_FROM_INDICATOR,
  DELETE_ACTION_FROM_NOT_IN_INDICATOR,
  SELECT_TECHNICAL_AREA,
  DESELECT_TECHNICAL_AREA,
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

const selectTechnicalArea = (technicalAreaId) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_TECHNICAL_AREA,
      payload: { technicalAreaId: technicalAreaId },
    })
  }
}

const clearFilterCriteria = () => {
  return (dispatch) => {
    // console.log()
    dispatch({
      type: DESELECT_TECHNICAL_AREA,
    })
  }
}

export {
  addActionToIndicator,
  deleteActionFromIndicator,
  selectTechnicalArea,
  clearFilterCriteria,
}
