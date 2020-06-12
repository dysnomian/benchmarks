import PropTypes from "prop-types"
import { deleteActionFromIndicator } from "../../config/actions"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Action from "./Action"
import React from "react"

const onDeleteAction = (actionId, indicatorId, dispatch) => {
  return () => {
    dispatch(deleteActionFromIndicator(actionId, indicatorId))
  }
}

const IndicatorActionList = (props) => {
  const indicator = props.indicator
  const dispatch = useDispatch()

  const planActionIdsByIndicator = useSelector((state) => {
    return state.planActionIdsByIndicator
  })

  const actions = useSelector((state) => state.actions, shallowEqual)
  const actionIdsByIndicator = planActionIdsByIndicator[indicator.id]

  return actionIdsByIndicator.map((actionId) => {
    const actionData = actions[actionId]
    return (
      <Action
        action={actionData}
        indicator={indicator}
        key={"action-" + indicator.id + "-" + actionId}
        onDeleteAction={onDeleteAction(actionId, indicator.id, dispatch)}
      />
    )
  })
}

IndicatorActionList.propTypes = {
  indicator: PropTypes.object.isRequired,
}

export default IndicatorActionList
