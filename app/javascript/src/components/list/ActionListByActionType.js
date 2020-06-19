import React from "react"
import { useSelector } from "react-redux"
import Action from "./Action"

const ActionListByActionType = () => {
  const planActionIds = useSelector((state) => state.planActionIds)
  const actionMap = useSelector((state) => state.actions)
  const selectedActionTypeOrdinal = useSelector(
    (state) => state.selectedActionTypeOrdinal
  )
  const actionIdsToDisplay = planActionIds.filter((actionId) => {
    const currentAction = actionMap[actionId]
    const action_types = currentAction.action_types || []
    return action_types.indexOf(selectedActionTypeOrdinal) >= 0
  })
  return actionIdsToDisplay.map((actionId) => {
    return <Action id={actionId} key={actionId} />
  })
}

export default ActionListByActionType
