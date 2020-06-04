import { DELETE_ACTION, DELETE_ACTION_FROM_INDICATOR } from "./constants"

const deleteActionFromIndicator = (actionId, indicatorId) => {
  return (dipatch) => {
    dipatch({
      type: DELETE_ACTION,
      payload: { actionId: actionId, indicatorId: indicatorId },
    })
    dipatch({
      type: DELETE_ACTION_FROM_INDICATOR,
      payload: { actionId: actionId, indicatorId: indicatorId },
    })
  }
}

export { deleteActionFromIndicator }
